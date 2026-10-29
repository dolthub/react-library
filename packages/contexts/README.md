# @dolthub/react-contexts

Shared React contexts and helpers: named context factories, comment-form state,
and feature-gate providers and components.

## Installation

```sh
yarn add @dolthub/react-contexts
```

Or:

```sh
npm install @dolthub/react-contexts
```

Your app must provide React `^19.1.0` and React DOM `^19.1.1`. Use matching
React and React DOM versions.

## Usage

`createContextWithDisplayName` creates a context with a default value and a name
for React DevTools:

```tsx
import React from "react";
import { createContextWithDisplayName } from "@dolthub/react-contexts";

const UserContext = createContextWithDisplayName(
  { name: "Guest" },
  "UserContext",
);

export function App() {
  return (
    <UserContext.Provider value={{ name: "Taylor" }}>
      <div>Signed in</div>
    </UserContext.Provider>
  );
}
```

`createCustomContext<T>(displayName)` creates a context whose runtime default is
`undefined`, intended for use with a provider and the hooks package's
`useContextWithError` helper.

Other exports include `CommentFormProvider`, `useCommentFormContext`,
`FeatureGateProvider`, and `FeatureGate`. See the [public exports](./src/index.ts)
and [developer guide](../../README.dev.md).
