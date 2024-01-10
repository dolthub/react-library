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
