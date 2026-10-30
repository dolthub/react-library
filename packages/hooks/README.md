# @dolthub/react-hooks

React hooks for state, lifecycle effects, browser events, session storage, and
responsive layout.

## Installation

```sh
yarn add @dolthub/react-hooks
```

or

```sh
npm install @dolthub/react-hooks
```

Your app must provide React `^19.1.0` and React DOM `^19.1.1`. Use matching
React and React DOM versions.

## Usage

```tsx
import React from "react";
import { useEffectOnMount } from "@dolthub/react-hooks";

function MyComponent() {
  useEffectOnMount(() => {
    console.log("do something on component mount");
  });

  return <div>Home</div>;
}
```

`useEffectOnMount` runs an effect with an empty dependency array. React Strict
Mode may run effects an additional time during development, so the callback
should tolerate that.

Other exports include `useSetState`, `useOnClickOutside`, `useInterval`,
`useStateWithSessionStorage`, and `useReactiveWidth`. See the
[public exports](./src/index.ts) for the complete list and the
[developer guide](../../README.dev.md) for local development.
