import { createRollupConfig } from "../../rollup.config.base.mjs";

const pkg = require("./package.json");

// querystring/url are node builtins used by urlUtils; keep them external.
export default createRollupConfig({ pkg, extraExternal: ["querystring", "url"] });
