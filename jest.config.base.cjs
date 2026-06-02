// Shared Jest configuration for every package. Each package's jest.config.js
// spreads this and overrides only what differs (jsdom setup file, CSS module
// mocking, or the file extensions it actually uses).
const TEST_REGEX = "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$";

module.exports = {
  testRegex: TEST_REGEX,
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  testPathIgnorePatterns: ["types", "node_modules", ".rollup.cache", "dist"],
  moduleFileExtensions: ["ts", "js", "tsx"],
  collectCoverage: false,
  clearMocks: true,
};
