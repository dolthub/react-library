# @dolthub/web-utils

TypeScript utilities for dates, strings, arrays, number formatting, validation,
and SQL queries. CommonJS, ESM, and TypeScript declarations are included.

## Installation

```sh
yarn add @dolthub/web-utils
```

Or:

```sh
npm install @dolthub/web-utils
```

## Usage

Import general utilities from the package root:

```ts
import { dedupe, initialUppercase } from "@dolthub/web-utils";

const names = dedupe(["alice", "alice", "bob"]);
const label = initialUppercase(names[0]); // "Alice"
```

See the [public exports](./src/index.ts) for the complete list.

### SQL helpers

SQL helpers are exported from `@dolthub/web-utils/parseSqlQuery`, not the package
root. Only consumers of that entry point need the optional peer dependency
`node-sql-parser` (`^5.4.0`):

```sh
yarn add node-sql-parser@^5.4.0
```

```ts
import {
  getTableNames,
  parseSelectQuery,
} from "@dolthub/web-utils/parseSqlQuery";

const tables = getTableNames("SELECT id FROM users"); // ["users"]
const query = parseSelectQuery("SELECT id FROM users"); // SELECT AST or null
```

These helpers use the parser's MySQL dialect for the calls shown above.
Other exports include query rewriting, ordering, and query-type checks. See
[parseSqlQuery.ts](./src/parseSqlQuery.ts) for the available helpers and their
failure behavior.

For local development, see the [developer guide](../../README.dev.md).
