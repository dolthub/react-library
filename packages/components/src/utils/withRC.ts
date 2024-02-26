import merge from "deepmerge";
import { Config } from "tailwindcss";
import breakpoints from "./theme/base/breakpoints";
import colors from "./theme/base/colors";
import typography from "./theme/base/typography";

const reactComponentsTailwindConfig: Config = {
  content: [
    "./node_modules/@dolthub/react-components/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gradientColorStops: colors,
      colors,
      fontFamily: typography,
      screens: breakpoints,
    },
  },
  plugins: [],
};

/**
 * Merge @dolthub/react-components and Tailwind CSS configurations
 */
export function withRC(tailwindConfig: Config) {
  const merged = merge(reactComponentsTailwindConfig, { ...tailwindConfig });
  // console.log("MERGE", merged.theme.extend?.colors);
  return merged;
}
