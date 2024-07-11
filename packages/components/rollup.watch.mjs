import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import { exec } from "child_process";
import {watch} from "rollup";
import { dts } from "rollup-plugin-dts";
import packageJson from "./package.json" assert { type: "json" };

const plugins = [
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
        sourcemap: true,
        name: "react-ts-lib",
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: plugins,
 
  },
  {
    input: "./types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    external: [/\.css$/],
    plugins:[dts()]
  },
];

const watcher =  watch(watchOptions);
watcher.on("event", event => {
  if (event.code === "ERROR") {
    console.error(event.error);
  }
  if (event.code === "START") {
    exec("yarn compile", (err,stderr) => {
      if (err) {
        console.error(`compile error: ${err}`);
        return;
      }
      if (stderr) {
        console.error(`compile stderr: ${stderr}`);
      }
      console.log(`compile completed`);
    });
  }
  if (event.code === "BUNDLE_END") {
    console.log("Build completed successfully");
    exec("yalc publish", (err, stdout, stderr) => {
      if (err) {
        console.error(`Publish error: ${err}`);
        return;
      }
      if (stderr) {
        console.error(`Publish stderr: ${stderr}`);
      }
      console.log(`Publish completed: ${stdout}`);
    });
  }
});

watcher.on("event", ({ result }) => {
  if (result) {
    result.close();
  }
});
