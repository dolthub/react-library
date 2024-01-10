# @dolthub/react-hooks

A library of useful React hooks.

## Installation

```
% yarn add @dolthub/react-hooks
```

or

```
% npm install @dolthub/react-hooks
```

## Usage

```tsx
import { useEffectOnMount } from "@dolthub/react-hooks";

function MyComponent() {
  useEffectOnMount(() => {
    console.log("do something on component mount");
  });

  return <div>Home</div>;
}
```

## Testing in a local package

If you have a local copy of this package and want to test a change in another local
package, you can either add `@dolthub/react-hooks` and point it at the file path, or if
`@dolthub/react-hooks` is already installed add the file path to `resolutions` in your
`package.json`, like so:

```json
// ../other-package/package.json
{
  ...,
  "resolutions": {
    "@dolthub/react-hooks": "file:../../react-library/packages/hooks",
    "@types/react": "18.2.33"
  }
}
```

Note that you may also need the same `@types/react` version.
