import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";

// Shared Rollup config factory. Every package produces a bundled CJS build
// (dist/cjs/[name].js), a bundled ESM build (dist/esm/[name].js), and rolled-up
// type declarations (dist/[name].d.ts). Declarations themselves are emitted to
// types/ by `tsc -b` (the compile step) and merged here by rollup-plugin-dts.
//
// Options:
//   pkg          - the package.json object (used to derive externals)
//   entries      - map of entry name -> source file. Defaults to a single
//                  `index` entry. Extra entries become extra public subpaths.
//   bundledDeps  - dependencies to bundle in rather than externalize (e.g.
//                  ESM-only packages that can't be require()'d from CJS).
//   extraExternal- additional ids to treat as external (e.g. node builtins).
//   extraPlugins - plugins to run before terser (e.g. postcss for CSS).
//   dtsExternal  - extra external matchers for the declaration bundle.
export function createRollupConfig({
  pkg,
  entries = { index: "src/index.ts" },
  bundledDeps = [],
  extraExternal = [],
  extraPlugins = [],
  dtsExternal = [],
}) {
  const bundled = new Set(bundledDeps);
  const externalDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    ...extraExternal,
  ].filter(dep => !bundled.has(dep));

  // `.css` is always internal so it can be inlined by postcss; everything in
  // externalDeps (and its subpaths) is left for the consumer to provide.
  const external = id =>
    !id.endsWith(".css") &&
    externalDeps.some(dep => id === dep || id.startsWith(`${dep}/`));

  // Declarations are emitted to types/ by `tsc -b`, not by rollup, so the
  // typescript plugin's own declaration output is disabled here.
  // declarationDir must be cleared too, otherwise the plugin rejects the
  // composite project's `declarationDir` for being outside the rollup `dir`.
  const jsPlugins = outDir => [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: false,
      declarationDir: undefined,
      outDir,
    }),
    ...extraPlugins,
    terser(),
  ];

  const entryNames = Object.keys(entries);

  const jsBuild = format => ({
    input: entries,
    output: {
      dir: `dist/${format}`,
      format,
      sourcemap: true,
      entryFileNames: "[name].js",
      // External CJS deps whose default export is the component (e.g.
      // reactjs-popup) need the importDefault helper in the CJS bundle,
      // otherwise `import X from "foo"` becomes `require("foo")` (the whole
      // module namespace) and rendering crashes with "got: object".
      interop: "auto",
    },
    external,
    plugins: jsPlugins(`dist/${format}`),
  });

  const dtsBuild = {
    input: Object.fromEntries(
      entryNames.map(name => [name, `./types/${name}.d.ts`]),
    ),
    output: {
      dir: "dist",
      format: "esm",
      entryFileNames: "[name].d.ts",
    },
    plugins: [dts()],
    external: [/\.css$/, ...dtsExternal],
  };

  return [jsBuild("cjs"), jsBuild("esm"), dtsBuild];
}
