import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import { exec } from "child_process";
import { watch } from "rollup";
import { dts } from "rollup-plugin-dts";
import packageJson from "./package.json" assert { type: "json" };

export const watchPlugins = [
  external(),
  resolve(),
  commonjs(),
  typescript({ tsconfig: "./tsconfig.json" }),
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
  }),
];

const watchOptions = [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: false,
        name: "react-ts-lib",
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: false,
      },
    ],
    plugins: plugins,
    watch: {
      include: "src/**",
    },
    cache: true,
  },
  {
    input: "./types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    external: [/\.css$/],
    plugins: [dts()],
    watch: {
      include: "types/**",
    },
    cache: true,
  },
];

const watcher = watch(watchOptions);
const green = `\x1b[32m%s\x1b[0m`;
const yellow = `\x1b[33m%s\x1b[0m`;
const red = `\x1b[31m%s\x1b[0m`;

watcher.on("event", event => {
  if (event.code === "ERROR") {
    console.error(event.error);
  }
  if (event.code === "START"  ) {
    console.log(yellow, "Build started...");
    exec("yarn compile", (err, stderr) => {
      if (err) {
        console.error(red, `Compile error: ${err}`);
        return;
      }
      if (stderr) {
        console.error(red, `Compile stderr: ${stderr}`);
      }
      console.log(green, `Compile completed`);
    });
  }
  if (event.code === "BUNDLE_END") {
      console.log(yellow, "All bundles built. Pushing...");

      exec("yalc push", (err, stdout, stderr) => {
        if (err) {
          console.error(red, `Push error: ${err}`);
          return;
        }else if (stderr) {
          console.error(red, `Push stderr: ${stderr}`);
        }else
        {
        console.log(green, `Push completed: ${stdout}`);
        }
       });
  }
});

watcher.on("event", ({ result }) => {
  if (result) {
    result.close();
  }
});
