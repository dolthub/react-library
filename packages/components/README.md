# @dolthub/react-components

React 19 components for forms, navigation, popups, modals, markdown, and other UI,
with Tailwind CSS 3 themes. Browse the
[Storybook](https://main--65ea532d4d49e58efd6b1662.chromatic.com) for examples.

## Installation

```sh
yarn add @dolthub/react-components react@^19 react-dom@^19 react-select@^5 react-tooltip@^6 tailwindcss@^3
```

Or with npm:

```sh
npm install @dolthub/react-components react@^19 react-dom@^19 react-select@^5 react-tooltip@^6 tailwindcss@^3
```

Use matching React and React DOM versions. The hooks and contexts dependencies
require React `^19.1.0` and React DOM `^19.1.1`.

### Peer dependencies

The package declares these peer ranges:

| Package               | Supported range       | Required                              |
| --------------------- | --------------------- | ------------------------------------- |
| `react`               | `^19`                 | Yes                                   |
| `react-dom`           | `^19`                 | Yes                                   |
| `react-select`        | `^5.0.0`              | Yes                                   |
| `react-tooltip`       | `^5.0.0 \|\| ^6.0.0`  | Yes                                   |
| `tailwindcss`         | `^3.0.0`              | Yes; Tailwind 4 is outside this range |
| `github-markdown-css` | `^5.0.0`              | Optional                              |
| `react-markdown`      | `^9.0.0 \|\| ^10.0.0` | Optional                              |
| `remark-gfm`          | `^4.0.0`              | Optional                              |

The current build bundles `react-markdown`, `remark-gfm`, and the imported
markdown CSS. They remain marked as optional peers in the package manifest.

## Usage and theming

Wrap your app in `ThemeProvider` to initialize the CSS variables used by the
components. Import components from the package root:

```tsx
import React from "react";
import { Button, ThemeProvider } from "@dolthub/react-components";

export function App() {
  return (
    <ThemeProvider>
      <Button onClick={() => console.log("Save clicked")}>Save</Button>
    </ThemeProvider>
  );
}
```

`ThemeProvider` uses the DoltHub colors by default. Supply `themeRGBOverrides` to
customize them; `hostedTailwindColorTheme` and `workbenchTailwindColorTheme` are
also exported. Set `updateRGBOnChange` when changing the theme after mount.

Component CSS is bundled into the JavaScript and injected into the page; there is
no separate package CSS file to import. The package also exports `mergeConfig`
for merging its Tailwind theme with an application's Tailwind 3 configuration.

See the [public exports](./src/index.ts) and
[theme definitions](./src/tailwind/theme) for the available components and themes.

## Development

From the repository root, build the workspace dependencies before starting
Storybook:

```sh
yarn dbuild
yarn workspace @dolthub/react-components storybook
```

See the [developer guide](../../README.dev.md) for checks and testing in a local app.
