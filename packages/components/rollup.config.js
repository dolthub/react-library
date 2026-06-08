import postcss from "rollup-plugin-postcss";
import { createRollupConfig } from "../../rollup.config.base.mjs";

const pkg = require("./package.json");

// react-markdown and remark-gfm are ESM-only and can't be require()'d from the
// CJS build, so they're bundled in rather than externalized.
export default createRollupConfig({
  pkg,
  bundledDeps: ["react-markdown", "remark-gfm"],
  extraPlugins: [
    postcss({
      config: { path: "./postcss.config.js" },
      modules: {
        generateScopedName: "[folder]_[local]__[hash:base64:5]",
      },
      minimize: true,
      inject: { insertAt: "top" },
    }),
  ],
});
