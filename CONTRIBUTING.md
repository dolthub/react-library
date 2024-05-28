# Contribution Guide for React Library

Thank you for contributing to React Library! This is a guide for successfully making
changes to this repository.

## Requirements

- Node.js 18+

## Getting Set Up

If it is your first time using [Yarn 4](https://yarnpkg.com/blog/release/4.0), first run:

```sh
% corepack enable
```

Corepack is a tool shipped with Node.js 16+ that will automatically select the right
package manager version to run depending on the project you're working on.

Then in the project root, install the dependencies:

```sh
react-library % yarn install
➤ YN0000: · Yarn 4.0.2
...
```

If corepack was enabled correctly, you should see Yarn version 4+ logged when you install.

Next, build the packages:

```sh
react-library % yarn dbuild
```

This will compile and build each package.

## Making a change

1. Make a change to a package.
2. Write unit tests for your change (see `[package]/src/__tests__`).
3. [Optional] If making a change to `components`, write a [story](https://storybook.js.org/docs/get-started/whats-a-story) for your change (see `components/src/__stories__`).
4. Make sure CI passes by running `yarn ci` in the project root.
5. Create a pull request against `main` with a description explaining the change.
6. Address feedback.

If you'd like to test a change to this repository against another project that uses one of
the React Library packages as a dependency before the change is released, refer to the
[developer guide](./README.dev.md).
