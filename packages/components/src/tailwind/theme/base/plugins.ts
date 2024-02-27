import plugin from "tailwindcss/plugin";

const widgetPlugin = plugin(({ addUtilities }) => {
  addUtilities({
    ".widget-shadow": {
      "box-shadow": "0 0 4px 0 rgba(148, 163, 167, 0.5)",
    },
    ".widget-shadow-hover": {
      "box-shadow": "3px 3px 7px 0 rgba(148, 163, 167, 0.6)",
    },
    ".widget-shadow-lightblue": {
      "box-shadow": "0 0 4px 0 rgba(81, 203, 238, 1)",
    },
    ".button-shadow": {
      "box-shadow": "1px 1px 4px 0 rgba(149, 163, 167, 0.5)",
    },
    ".button-shadow-hover": {
      "box-shadow": "3px 3px 4px 0 rgba(149, 163, 167, 0.5)",
    },
  });
});

const oddSizesPlugin = plugin(({ addUtilities }) => {
  addUtilities({
    ".z-1": {
      zIndex: "1",
    },
    ".z-100": {
      zIndex: "100",
    },
    ".border-3": {
      borderWidth: "3px",
    },
    ".border-t-3": {
      borderTopWidth: "3px",
    },
    ".border-r-3": {
      borderRightWidth: "3px",
    },
    ".border-b-3": {
      borderBottomWidth: "3px",
    },
    ".border-l-3": {
      borderLeftWidth: "3px",
    },
    ".border-x": {
      borderRightWidth: "1px",
      borderLeftWidth: "1px",
    },
    ".border-y": {
      borderTopWidth: "1px",
      borderBottomWidth: "1px",
    },
    ".text-2xs": {
      fontSize: "0.625rem",
      lineHeight: "1rem",
    },
  });
});

const borderPlugin = plugin(({ addUtilities }) => {
  addUtilities({
    ".border-opaque-rounded": {
      border: "1px solid rgba(255, 255, 255, 0.15)",
      borderRadius: "4px",
    },
  });
});

const backgroundPlugin = plugin(({ addUtilities }) => {
  addUtilities({
    ".bg-opaque-rounded": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderRadius: "4px",
    },
  });
});

export default [widgetPlugin, oddSizesPlugin, borderPlugin, backgroundPlugin];
