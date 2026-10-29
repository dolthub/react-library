# @dolthub/proto-resource-utils

Utilities for Google protobuf-style resources and names: resource-name
conversion, validation, display names, comparators, and sorters. The package
works with resource objects and getter-based objects; it does not require a
protobuf runtime or React as a peer dependency.

## Installation

```sh
yarn add @dolthub/proto-resource-utils
```

Or:

```sh
npm install @dolthub/proto-resource-utils
```

## Usage

```ts
import { byName, displayName } from "@dolthub/proto-resource-utils";

const resources = [
  { name: "databases/zebra" },
  { name: "databases/alpaca", displayName: "Alpaca database" },
];

resources.sort(byName); // Sorts by the last resource-name segment.
const label = displayName(resources[0]); // "Alpaca database"
```

`displayName` prefers a non-empty `getDisplayName()` or `displayName` value,
then falls back to the last segment of `getName()` or `name`.

See the [public exports](./src/index.ts) for validation helpers,
`ResourceNameConverter`, and `ResourceUtils`, and the
[developer guide](../../README.dev.md) for local development.
