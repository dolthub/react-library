import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import { dts } from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";

const packageJson = require("./package.json");

// ESM-only packages must be bundled since CJS output can't require() them
const esmOnlyPackages = new Set(["react-markdown", "remark-gfm"]);

const externalDeps = [
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.peerDependencies || {}),
].filter((dep) => !esmOnlyPackages.has(dep));

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
    external: (id) =>
      !id.endsWith(".css") &&
      externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`)),
    plugins: [
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
