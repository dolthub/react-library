# Developer notes

## Testing this package in a local app

Using [`yalc`](https://github.com/wclr/yalc) is the best way to test this library in another local package.

First, compile and build this package:

```zsh
% yarn dbuild
```

And publish to `yalc`:

```zsh
% yalc publish
```

The `yalc:publish` script will also achieve the above.

Then in your app, link to this package:

```zsh
other-app % yalc link @dolthub/react-hooks
```

And you will see and up-to-date version of this package. When you make a change to this package, you can push the change by running `yarn yalc:push` and you should see it automatically reflected in your app.

To remove the yalc package in your app, run `yalc remove --all`.

**Coming soon**: using `yalc` to watch for changes and automatically push
