# Contribution Guide for React Library

Thank you for contributing to React Library! This is a guide for successfully making
changes to this repository.

## Requirements

- Node.js 24, matching the build and publishing workflows
- Corepack to select the Yarn version pinned in `package.json`

## Getting set up

From the repository root:

```sh
corepack enable
yarn install --immutable
yarn dbuild
```

If Corepack is unavailable in your Node installation, install it before running
these commands. `yarn --version` should match the root `packageManager` field.

`yarn dbuild` compiles and bundles every package in dependency order. Run
`yarn ci` for the formatting, lint, build, and test checks used by CI.

## Making a change

1. Make a change to a package.
2. Write unit tests for your change (see `packages/<package>/src/__tests__`).
3. [Optional] If making a change to `components`, write a [story](https://storybook.js.org/docs/get-started/whats-a-story) for your change (see `packages/components/src/__stories__`).
4. Make sure CI passes by running `yarn ci` in the project root.
5. Create a pull request against `main` with a description explaining the change.
6. Address feedback.

If you'd like to test a change to this repository against another project that uses one of
the React Library packages as a dependency before the change is released, refer to the
[developer guide](./README.dev.md).
