const { settings, parser, parserOptions, rules } = require("./.eslintrc.cjs");

module.exports = {
  parser,
  parserOptions,
  settings,
  env: {
    browser: true,
    node: true,
    "jest/globals": true,
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier",
    "plugin:jest-dom/recommended",
    "plugin:testing-library/dom",
    "plugin:css-modules/recommended",
  ],
  plugins: [
    "@typescript-eslint",
    "jest",
    "jest-dom",
    "testing-library",
    "react",
    "react-hooks",
    "css-modules",
  ],
  rules: {
    ...rules,
    "css-modules/no-unused-class": "warn",
    "jsx-a11y/control-has-associated-label": "warn",
    "jsx-a11y/anchor-is-valid": "off",
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react/destructuring-assignment": "off",
    "react/jsx-curly-brace-presence": [
      "error",
      { children: "ignore", props: "never" },
    ],
    "react/jsx-filename-extension": "off",
    "react/jsx-props-no-spreading": "off",
    "react/state-in-constructor": ["error", "never"],
    "react/require-default-props": "off",
    "react/no-unused-prop-types": "error",
    "react/prop-types": "off",
  },
  overrides: [
    {
      files: ["*test.ts?(x)"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};
