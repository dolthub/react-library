import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import { dts } from "rollup-plugin-dts";

const packageJson = require("./package.json");

// Externalize all dependencies to avoid bundling them
const externalDeps = [
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.peerDependencies || {}),
  "querystring",
  "url",
];

const external = (id) =>
  externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`));

const plugins = [
  nodeResolve(),
  commonjs(),
  typescript({ tsconfig: "./tsconfig.json", outputToFilesystem: true }),
  terser(),
];

export default [
  {
    input: {
      index: "src/index.ts",
      parseSqlQuery: "src/parseSqlQuery.ts",
    },
    output: [
      {
        dir: "dist/cjs",
        format: "cjs",
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: "src",
      },
      {
        dir: "dist/esm",
        format: "esm",
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    ],
    external,
    plugins,
  },
  {
    input: {
      index: "./types/index.d.ts",
      parseSqlQuery: "./types/parseSqlQuery.d.ts",
    },
    output: [
      {
        dir: "dist",
        format: "esm",
        preserveModules: true,
        preserveModulesRoot: "types",
      },
    ],
    plugins: [dts()],
  },
];
