import { createRollupConfig } from "../../rollup.config.base.mjs";

const pkg = require("./package.json");

export default createRollupConfig({ pkg });
