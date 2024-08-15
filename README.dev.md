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
hooks % yalc publish
```

The `yalc:publish` script will also achieve the above.

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