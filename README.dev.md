# Developer notes

## Testing a package in a local app

Using [`yalc`](https://github.com/wclr/yalc) is the best way to test a library in another
local package.

First, choose a package to compile and build:

```zsh
% cd packages/hooks
hooks % yarn dbuild
```

And publish to `yalc`:

```zsh
# If yalc is installed globally
hooks % yalc publish
# Using yarn script
hooks % yarn yalc:publish
```

Then in your app, link to this package:

```zsh
other-app % yalc link @dolthub/react-hooks
```

And you will see and up-to-date version of the `react-hooks` package. When you make a
change to the package, you can push the change by running `yarn yalc:push` and you should
see it automatically reflected in your app.

To remove the yalc package in your app, run `yalc remove --all`.

## Watch mode

You can use `yalc` to watch for changes in the `components` package and automatically push.

1. In the root of `react-library`:

```bash
yarn && yarn dbuild
```

2. Publish the `components` package, in `packages/components`:

```bash
yarn yalc:publish
```

3. Link the local package in your app:

```bash
yarn yalc @dolthub/react-components
```

4. Start watch mode in `packages/components`:

```bash
yarn dbuild:watch
```

5. Make the changes, wait for the watch to finish building and pushing.

6. Refresh the page in your browser to see the change.

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

- **`tar`** -- keep. This one is load-bearing and is *not* redundant. Its dependents
  (`cacache`, `node-gyp`) both cap at `^6`, so without the pin `tar` resolves to 6.2.1,
  which is inside the advisory ranges (they are unbounded below). The pin is doing a
  deliberate cross-major override, 6.x to 7.5.x. Do not remove it without checking what
  `tar` resolves to afterwards.
- **`react`, `react-dom`** -- keep. Pinned to the same version on purpose; React wants
  these two to match. Bump them together, and remember that a Dependabot PR touching
  only one of them will be a no-op until the pin moves too.
- **`@emotion/react`** -- keep. Held at a version whose JSX types are compatible with
  React 19, so `react-select` components typecheck. Currently the same as the latest
  release, so it has no effect today, but it guards against a future incompatible one.

### Pinning one major line only

When several majors of a package coexist in the tree and only some are vulnerable, the
resolution key must be the **full descriptor a dependent actually requests**, for
example `"svgo@npm:^2.7.0": "2.8.4"`. Yarn matches these keys against requested
descriptors, not by semver range, so:

- A bare key (`"svgo"`) matches *every* major and will happily downgrade an unaffected
  one.
- An abbreviated key (`"svgo@^2"`) matches nothing. Yarn does not warn -- the install
  succeeds and the version never moves.

Either way the failure is quiet, so check the resolved versions in `yarn.lock` after
changing anything here rather than trusting the install output.
