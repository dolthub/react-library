import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import external from "rollup-plugin-peer-deps-external";
import { dts } from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";
import stringHash from "string-hash";

const packageJson = require("./package.json");

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
    plugins: [
      external(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        plugins: [postcssPresetEnv(), autoprefixer()],
        autoModules: false,
        onlyModules: false,
        modules: {
          generateScopedName: (name, filename, css) => {
            if (filename.includes("global")) {
              return name;
            }
            const hash = stringHash(css).toString(36).substring(0, 5);
            return `${name}_${hash}`;
          },
        },
        minimize: true,
        sourceMap: false,
      }),
      terser(),
    ],
  },
  {
    input: "./types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
