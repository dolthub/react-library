<<<<<<< Updated upstream
const config = {
=======
import { withRC } from "./src/utils/withRC";

const config = withRC({
>>>>>>> Stashed changes
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.tsx", "./src/**/*.css"],
  theme: {
    extend: {
      transitionProperty: { width: "width" },
<<<<<<< Updated upstream
      fontFamily: {
        sans: ["Source Sans Pro", "sans-serif"],
      },
=======
>>>>>>> Stashed changes
    },
  },
});

export default config;
