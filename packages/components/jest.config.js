const TEST_REGEX = "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$";

module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testRegex: TEST_REGEX,
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  testPathIgnorePatterns: ["types", "node_modules", "rollup.cache", "dist"],
  moduleFileExtensions: ["ts", "js", "tsx"],
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
    "^@dolthub/web-utils$": "<rootDir>/../utils/src/index.ts",
    "^@dolthub/react-hooks$": "<rootDir>/../hooks/src/index.ts",
    "^@dolthub/react-contexts$": "<rootDir>/../contexts/src/index.ts",
  },
  collectCoverage: false,
  clearMocks: true,
};
