# Developer notes

## Setup and checks

Use Node.js 24 and the Yarn version selected by Corepack from the root
`package.json`. See the [contributing guide](./CONTRIBUTING.md) for setup.
Run these commands from the repository root:

```sh
yarn install --immutable
yarn dbuild
yarn ci
```

`yarn dbuild` builds utils, hooks, contexts, resource-utils, and components in that
order. Each package's `compile` script emits declarations to `types/`; `build`
bundles CommonJS into `dist/cjs/`, ESM into `dist/esm/`, and declarations into
`dist/`. Published packages include `dist/` rather than the source tree.

For a single package, use its workspace name, for example:

```sh
yarn workspace @dolthub/react-components dbuild
yarn workspace @dolthub/react-components test
```

Build workspace dependencies first with `yarn dbuild`. The root `yarn ci` runs
formatting checks, lint, builds, and tests in sequence.

## Storybook

After building the packages, run:

```sh
yarn workspace @dolthub/react-components storybook
```

This starts Storybook on port 6006. To generate the static site:

```sh
yarn workspace @dolthub/react-components build-storybook
```

Stories live in `packages/components/src/__stories__/`. Component PRs that are
neither drafts nor Dependabot PRs publish to Chromatic through the CI workflow.

## Testing a package in a local app

Use [`yalc`](https://github.com/wclr/yalc) to test a built package in another app.
First build the workspace dependencies, then publish the package locally:

```sh
yarn dbuild
yarn workspace @dolthub/react-hooks yalc:publish
```

The `yalc:publish` script rebuilds the package before publishing it to the local
yalc store. In the consuming app, run the following with the yalc CLI installed:

```sh
yalc link @dolthub/react-hooks
```

After editing the library, rebuild and push the update from this repository:

```sh
yarn workspace @dolthub/react-hooks yalc:push
```

Use `@dolthub/react-components` or another workspace name for other packages.
If you change a workspace dependency too, rebuild and publish or push that package
as well. Refresh or restart the consuming app as needed. To remove local links,
run `yalc remove --all` in that app.

### Watch mode

The components package still has a `dbuild:watch` script, but its
`rollup.watch.mjs` uses the old JSON import assertion syntax (`assert`), which
Node.js 24 rejects. Use `yarn workspace @dolthub/react-components yalc:push` after
changes until the watch script is updated.

## Dependency updates and releases

[Dependabot](./.github/dependabot.yaml) checks npm dependencies monthly and groups
React, Storybook, TypeScript ESLint, Jest, ESLint, and Babel updates. The ESLint and
Babel groups include minor and patch updates only. Storybook updates are handled
by Dependabot; there is no separate scheduled Storybook upgrade workflow.

Maintainers release packages with the
[Publish Package workflow](./.github/workflows/publish-packages-main.yaml), selecting
the package directory and version. It creates a version PR, enables auto-merge,
waits for the merge, then builds from `main`, creates a GitHub release, and
publishes the selected package to npm.

## Yarn resolutions

`package.json` is strict JSON and cannot carry comments, so the reasoning for each
entry in the root `resolutions` block lives here.

Every entry should have a reason to exist. A pin added to clear a security advisory
usually stops being necessary once the lockfile is regenerated: dependents normally
request the package with a `^` range, so Yarn picks up the patched version on its own
and the lockfile holds it there. A pin that has outlived its reason is not harmless --
it silently overrides later upgrades, so a Dependabot PR bumping that package looks
like it succeeds and changes nothing.

Current entries:

- **`webpack-dev-middleware@npm:^6.1.2`** -- Storybook's Webpack builder still
  requests 6.x, which is affected by GHSA-g84c-rxfj-3j2c. Override only that
  descriptor to 7.4.6, whose path traversal fix rejects requests outside the output
  directory. Remove this override once Storybook requests a patched version.

- **`tar`** -- keep. This one is load-bearing and is _not_ redundant. Its dependents
  (`cacache`, `node-gyp`) both cap at `^6`, so without the pin `tar` resolves to 6.2.1,
  which is inside the advisory ranges (they are unbounded below). The pin is doing a
  deliberate cross-major override, 6.x to 7.5.x. Do not remove it without checking what
  `tar` resolves to afterwards.

### Pinning one major line only

When several majors of a package coexist in the tree and only some are vulnerable, the
resolution key must be the **full descriptor a dependent actually requests**, for
example `"svgo@npm:^2.7.0": "2.8.4"`. Yarn matches these keys against requested
descriptors, not by semver range, so:

- A bare key (`"svgo"`) matches _every_ major and will happily downgrade an unaffected
  one.
- An abbreviated key (`"svgo@^2"`) matches nothing. Yarn does not warn -- the install
  succeeds and the version never moves.

Either way the failure is quiet, so check the resolved versions in `yarn.lock` after
changing anything here rather than trusting the install output.
