const base = require("../../jest.config.base.cjs");

module.exports = {
  ...base,
  moduleFileExtensions: ["ts", "js"],
  testPathIgnorePatterns: [...base.testPathIgnorePatterns, "helpers"],
};
