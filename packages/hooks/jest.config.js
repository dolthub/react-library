const base = require("../../jest.config.base.cjs");

module.exports = {
  ...base,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
