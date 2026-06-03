import { createRollupConfig } from "../../rollup.config.base.mjs";

const pkg = require("./package.json");

// `parseSqlQuery` is a separate public entry point (see the "exports" map) so
// that consumers can import it without pulling node-sql-parser into the main
// bundle. querystring/url are node builtins used by urlUtils.
export default createRollupConfig({
  pkg,
  entries: {
    index: "src/index.ts",
    parseSqlQuery: "src/parseSqlQuery.ts",
  },
  extraExternal: ["querystring", "url"],
});
