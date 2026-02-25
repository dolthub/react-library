import { Preview } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "storybook/viewport";
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
        icon: "circlehollow",
        items: [
          { value: "dolthub", title: "DoltHub" },
          { value: "hosted", title: "Hosted Dolt" },
          { value: "workbench", title: "Dolt Workbench" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: "light" },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    backgrounds: {
      options: {
        light: { name: "light", value: "white" },
        lightish: { name: "lightish", value: staticColors.stone["50"] },
        dark: { name: "dark", value: staticColors.space["700"] },
        blue: { name: "blue", value: staticColors.ocean["400"] },
      },
    },
    viewport: {
      options: INITIAL_VIEWPORTS,
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
