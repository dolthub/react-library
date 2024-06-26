import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { Preview } from "@storybook/react";
import React from "react";
import "../src/styles/global.css";
import ThemeProvider from "../src/tailwind/context";
import { staticColors } from "../src/tailwind/theme/base/colors";
import { tailwindColorTheme as dolthubTheme } from "../src/tailwind/theme/dolthub/colors";
import { tailwindColorTheme as hostedTheme } from "../src/tailwind/theme/hosted/colors";
import { tailwindColorTheme as workbenchTheme } from "../src/tailwind/theme/workbench/colors";
import { IThemeRGB } from "../src/tailwind/types";

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "dolthub",
      toolbar: {
        // The icon for the toolbar item
        icon: "circlehollow",
        // Array of options
        items: [
          { value: "dolthub", title: "DoltHub" },
          { value: "hosted", title: "Hosted Dolt" },
          { value: "workbench", title: "Dolt Workbench" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "white" },
        { name: "lightish", value: staticColors.stone["50"] },
        { name: "dark", value: staticColors.space["700"] },
        { name: "blue", value: staticColors.ocean["400"] },
      ],
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.args.theme ?? context.globals.theme;
      return (
        <ThemeProvider themeRGBOverrides={getTheme(theme)} updateRGBOnChange>
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

function getTheme(theme: string): IThemeRGB {
  switch (theme) {
    case "hosted":
      return hostedTheme;
    case "workbench":
      return workbenchTheme;
    default:
      return dolthubTheme;
  }
}

export default preview;
