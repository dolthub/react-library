import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
 import { terser } from "rollup-plugin-terser";
import external from "rollup-plugin-peer-deps-external";
import { dts } from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import { exec } from 'child_process'; 


// execute `yalc push` after build in watch mode
const executeAfterBuild = () => ({
  name: 'execute-after-build',
  writeBundle: {
    sequential: true,
    order: 'post',
    async handler() {
      exec('yalc push', (err, stdout, stderr) => {
        if (err) {
          console.error(`Push error: ${err}`);
          return;
        }
        if (stderr) {
          console.error(`Push stderr: ${stderr}`);
        }
        console.log(`Push completed: ${stdout}`);
      });
    }
  } 
}); 

//execute `yarn compile` before build
const executeBeforeBuild = () => ({
  name: 'execute-before-build',
  buildStart() {
    exec('yarn compile', (err, stdout, stderr) => {
      if (err) {
        console.error(`compile error: ${err}`);
        return;
      }
      if (stderr) {
        console.error(`compile stderr: ${stderr}`);
      }
      console.log(`compile completed: ${stdout}`);
    });
  }
});

const packageJson = require("./package.json");
const isWatchMode = process.env.ROLLUP_WATCH === 'true';
const plugins= [
  external(),
  resolve(),
  commonjs(),
  typescript({tsconfig: './tsconfig.json'}),
  executeBeforeBuild(),
  postcss({
    config: {
      path: "./postcss.config.js",
    },
    modules: {
      generateScopedName: "[folder]_[local]__[hash:base64:5]",
    },
    minimize: true,
    inject: {
      insertAt: "top",
    },
  })
] 
 
export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        name: "react-ts-lib",
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: isWatchMode?[ ...plugins]: [...plugins, terser(),]
  },
  {
    input: "./types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: isWatchMode ? [dts(),executeAfterBuild()]:[dts()],
    external: [/\.css$/],
  },
];
