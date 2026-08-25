// Shared Jest configuration for every package. Each package's jest.config.js
// spreads this and overrides only what differs (jsdom setup file, CSS module
// mocking, or the file extensions it actually uses).
const TEST_REGEX = "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$";

module.exports = {
  testRegex: TEST_REGEX,
  // Resolve babel-jest explicitly. jest-config bundles its own copy, and that
  // copy resolves @babel/core to a nested Babel 7 -- which would then run our
  // Babel 8 presets. Pointing at the workspace copy keeps core and presets on 8.
  transform: {
    "^.+\\.tsx?$": require.resolve("babel-jest"),
  },
  testPathIgnorePatterns: ["types", "node_modules", ".rollup.cache", "dist"],
  moduleFileExtensions: ["ts", "js", "tsx"],
  collectCoverage: false,
  clearMocks: true,
};
