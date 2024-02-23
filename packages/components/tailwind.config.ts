import { withRC } from "./src/utils/withRC";

const config = withRC({
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.tsx", "./src/**/*.css"],
  theme: {
    extend: {
      transitionProperty: { width: "width" },
      fontFamily: {
        sans: ["Source Sans Pro", "sans-serif"],
      },
    },
  },
});

export default config;
