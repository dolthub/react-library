import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import { exec } from "child_process";
import { watch } from "rollup";
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
    cache:true,
  },
  {
    input: "./types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    external: [/\.css$/],
    plugins: [dts()],
    watch: {
      include: "types/**",
    },
  },
];

const watcher = watch(watchOptions);
let pendingBundles = watchOptions.length;
const green = `\x1b[32m%s\x1b[0m`;
const yellow = `\x1b[33m%s\x1b[0m`;
const red = `\x1b[31m%s\x1b[0m`;

watcher.on("event", event => {
  if (event.code === "ERROR") {
    console.error(event.error);
  }
  if (event.code === "START" && pendingBundles === watchOptions.length) {
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
    pendingBundles--;
    console.log(green, "Build completed successfully for one bundle");

    if (pendingBundles === 0) {
      console.log(yellow, "All bundles built. Publishing...");

      exec("yalc publish", (err, stdout, stderr) => {
        if (err) {
          console.error(red, `Publish error: ${err}`);
          return;
        }
        if (stderr) {
          console.error(red, `Publish stderr: ${stderr}`);
        }
        console.log(green, `Publish completed: ${stdout}`);
        pendingBundles = watchOptions.length;
      });
    }
  }
});

watcher.on("event", ({ result }) => {
  if (result) {
    result.close();
  }
});
