import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { Preview } from "@storybook/react";
import React from "react";
import "../src/styles/global.css";
import ThemeProvider from "../src/tailwind/context";

const preview: Preview = {
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
        { name: "lightish", value: "#f1f3f8" },
        { name: "dark", value: "#182134" },
        { name: "blue", value: "#2b5db6" },
      ],
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
