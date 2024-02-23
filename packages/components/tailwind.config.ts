const colors = {
  primary: "#010a40",
  "acc-grey": "#b2c0c4",
  "acc-red": "#ff9a99",
};

const config = {
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.tsx", "./src/**/*.css"],
  theme: {
    extend: {
      transitionProperty: { width: "width" },
      gradientColorStops: colors,
      colors,
      fontFamily: {
        sans: ["Source Sans Pro", "sans-serif"],
      },
    },
  },
};

export default config;
