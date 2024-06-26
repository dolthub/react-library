import merge from "deepmerge";
import { Config } from "tailwindcss";
import breakpoints from "./theme/base/breakpoints";
import colors from "./theme/base/colors";
import plugins from "./theme/base/plugins";
import typography from "./theme/base/typography";

const reactComponentsTailwindConfig: Config = {
  content: [
    "./node_modules/@dolthub/react-components/src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins,
  theme: {
    gradientColorStops: colors,
    colors,
    extend: {
      transitionProperty: { width: "width" },
      fontFamily: typography,
      screens: breakpoints,
      borderColor: {
        DEFAULT: colors.stone["100"],
      },
    },
  },
};

/**
 * Merge @dolthub/react-components and Tailwind CSS configurations
 */
export function mergeConfig(tailwindConfig: Config): Config {
  const merged = merge(reactComponentsTailwindConfig, { ...tailwindConfig });
  return merged;
}
