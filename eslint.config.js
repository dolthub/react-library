import typescriptEslint from "typescript-eslint";
import js from "@eslint/js";
import { includeIgnoreFile } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";
import testingLibrary from "eslint-plugin-testing-library";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default typescriptEslint.config(
  // Base ESLint recommended config
  js.configs.recommended,
  
  // TypeScript-ESLint recommended configs
  ...typescriptEslint.configs.recommended,
  ...typescriptEslint.configs.recommendedTypeChecked,
  
  // Legacy configs using compatibility utilities
  ...compat.extends("airbnb-base", "prettier"),
  
  // Global ignores
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.rollup.cache/**",
      "**/coverage/**",
      "**/types/**",
      "**/*.tsbuildinfo",
      "**/.eslintcache",
      "**/storybook-static/**",
      "**/__mocks__/**",
    ],
  },
  
  // Base configuration for TypeScript files
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: true,
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      // TypeScript rules
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "default",
          format: ["camelCase"],
          leadingUnderscore: "allow",
          trailingUnderscore: "allow",
        },
        {
          selector: "variable",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
        },
        {
          selector: "variable",
          types: ["boolean", "number", "string", "array"],
          format: ["camelCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
        },
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
        {
          selector: "enumMember",
          format: ["PascalCase", "UPPER_CASE"],
        },
        {
          selector: ["function"],
          format: ["PascalCase", "camelCase"],
        },
        {
          selector: ["objectLiteralProperty", "objectLiteralMethod"],
          format: null,
        },
        {
          selector: ["import"],
          format: ["PascalCase", "camelCase"],
          leadingUnderscore: "allow",
        },
      ],
      "@typescript-eslint/no-base-to-string": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn", 
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/require-await": "warn",
      "@typescript-eslint/no-misused-promises": "warn",
      "@typescript-eslint/unbound-method": "warn",
      "@typescript-eslint/restrict-template-expressions": "warn",
      "@typescript-eslint/no-unnecessary-type-assertion": "warn",
      "@typescript-eslint/no-duplicate-type-constituents": "warn",
      "@typescript-eslint/no-unsafe-enum-comparison": "warn",
      "@typescript-eslint/no-extra-non-null-assertion": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-namespace": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unnecessary-condition": [
        "error",
        { allowConstantLoopConditions: true },
      ],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-use-before-define": [
        "error",
        {
          classes: false,
          functions: false,
        },
      ],
      "@typescript-eslint/prefer-interface": "off",
      "@typescript-eslint/prefer-nullish-coalescing": ["warn"],
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/prefer-string-starts-ends-with": "error",
      "@typescript-eslint/promise-function-async": "error",
      
      // Import rules
      "import/prefer-default-export": "off",
      "import/no-extraneous-dependencies": [
        "error",
        { devDependencies: ["**/__tests__/**", "**/__stories__/**"] },
      ],
      
      // General rules
      "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
      "no-sequences": "error",
      "no-underscore-dangle": "off",
      "no-use-before-define": ["error", { classes: false, functions: false }],
      "arrow-body-style": [
        "error",
        "as-needed",
        { requireReturnForObjectLiteral: true },
      ],
      
      // Disable import extensions for TypeScript files
      "import/extensions": ["error", "ignorePackages", {
        "js": "never",
        "jsx": "never", 
        "ts": "never",
        "tsx": "never"
      }],
    },
  },
  
  // Browser globals for hooks that use DOM/Window APIs
  {
    files: ["packages/hooks/**/*.ts", "packages/hooks/**/*.tsx"],
    plugins: {
      "react-hooks": reactHooks,
    },
    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
        sessionStorage: "readonly",
        localStorage: "readonly",
        console: "readonly",
        NodeJS: "readonly",
      },
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  
  // Node.js environment configuration for utilities
  {
    files: ["packages/utils/**/*.ts", "packages/resource-utils/**/*.ts"],
    languageOptions: {
      globals: {
        global: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __filename: "readonly",
        __dirname: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
        console: "readonly",
        document: "readonly",
        window: "readonly",
        NodeJS: "readonly",
      },
    },
  },
  
  // Browser environment for contexts (uses window and document)
  {
    files: ["packages/contexts/**/*.ts", "packages/contexts/**/*.tsx"],
    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
      },
    },
  },
  
  // React configuration
  {
    files: ["packages/components/**/*.{ts,tsx,js,jsx}", "**/*.stories.{ts,tsx,js,jsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    ...compat.extends("airbnb", "prettier")[0],
    languageOptions: {
      globals: {
        React: "readonly",
        JSX: "readonly",
        window: "readonly",
        document: "readonly",
        console: "readonly",
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  
  
  // Test files configuration
  {
    files: ["**/*test.{ts,tsx,js,jsx}", "**/__tests__/**/*.{ts,tsx,js,jsx}"],
    plugins: {
      "testing-library": testingLibrary,
    },
    ...compat.extends("plugin:jest/recommended", "plugin:jest-dom/recommended", "plugin:testing-library/dom")[0],
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "testing-library/no-node-access": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/unbound-method": "off",
      "func-names": "off",
    },
  },
  
  // Storybook files configuration
  {
    files: ["**/*.stories.{ts,tsx,js,jsx}", ".storybook/**/*.{ts,tsx,js,jsx}"],
    ...compat.extends("plugin:storybook/recommended")[0],
  }
);