# react-library

A Yarn workspace containing DoltHub's shared React components, contexts, hooks, and
TypeScript utilities.

| Package                                                      | Purpose                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`@dolthub/react-components`](./packages/components)         | UI components and Tailwind themes                            |
| [`@dolthub/react-contexts`](./packages/contexts)             | Context factories, comment forms, and feature gates          |
| [`@dolthub/react-hooks`](./packages/hooks)                   | Hooks for state, browser events, storage, and layout         |
| [`@dolthub/proto-resource-utils`](./packages/resource-utils) | Resource names, validation, and sorting                      |
| [`@dolthub/web-utils`](./packages/utils)                     | General web utilities and an optional SQL parser entry point |

Each package README lists installation requirements and usage. Packages ship
CommonJS and ESM builds with TypeScript declarations. The React packages target
React 19; components use Tailwind CSS 3.

## Local development

Use Node.js 24, matching the CI, Storybook publishing, and package publishing
workflows. Corepack selects the Yarn version pinned in the root `package.json`.
From the repository root:

```sh
corepack enable
yarn install --immutable
yarn dbuild
yarn ci
```

`yarn dbuild` compiles and bundles all packages in dependency order. `yarn ci`
checks formatting, runs lint, rebuilds the packages, and runs tests.

To start Storybook after building:

```sh
yarn workspace @dolthub/react-components storybook
```

Storybook runs on port 6006.

## Resources

- [Contributing guide](./CONTRIBUTING.md)
- [Developer guide](./README.dev.md)
- [Custom Tailwind themes](./packages/components/src/tailwind/theme)
- [Custom Tailwind colors](./packages/components/src/tailwind/theme/base/colors.ts)
- [React components Storybook](https://main--65ea532d4d49e58efd6b1662.chromatic.com)
