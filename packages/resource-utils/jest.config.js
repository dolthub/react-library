const TEST_REGEX = "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$";

module.exports = {
  testRegex: TEST_REGEX,
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  testPathIgnorePatterns: [
    "types",
    "node_modules",
    ".rollup.cache",
    "dist",
    "helpers",
  ],
  moduleFileExtensions: ["ts", "js"],
  collectCoverage: false,
  clearMocks: true,
};
