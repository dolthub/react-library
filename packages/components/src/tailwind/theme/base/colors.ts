import { IThemeColors, IThemeRGB, IThemeVariables } from "../../types";

// const greys = {
// "ld-lightblue": "#f6f8f9", // stone-50
// "ld-lightpurple": "#f1f3f8", // stone-50
// "ld-grey": "#f2f5fb", // stone-50
// "ld-lightgrey": "#e1e5e7", // stone-100
// "acc-lightgrey": "#c6cdd0", // stone-100
// "acc-grey": "#b2c0c4", // stone-300
// "ld-darkgrey": "#95a3a7", // storm-200
// "acc-light-text": "#999db3", // stone-300
// "acc-darkgrey": "#5d6280", // stone-500
// "acc-code": "#575662", // space-600
// "ld-darkergrey": "#384B52", // storm-500
// };

// const blues = {
// "ld-blue": "#6db0fc", // sky-300
// "acc-hoverlinkblue": "#3d91f0", // sky-400
// "acc-linkblue": "#1f6dc6", // sky-600
// "ld-mediumblue": "#2b5db6", // sky-600
// "acc-hoverblue": "#1d2c7f", // sky-900
// "ld-darkerblue": "#1e2842", // space-600
// "ld-darkestblue": "#182134", // space-700
// };

// const accents = {
// "acc-lightgreen": "#d4f5e4", // mint-50

// "acc-bright-green": "#29e3c1", // mint-200
// "acc-hovergreen": "#6fdda4", // green-600
// "acc-green": "#5ac58d", // green-500

// "acc-hoverred": "#EF4341", // red-500
// "acc-red": "#FF6967", // red-400
// "acc-orange": "#ed8936", // orange-400
// "acc-pink": "#d588d5", // pink-200
// "acc-purple": "#805EDD", // purple-400
// };

// TODO: Improve these names
export const staticColors = {
  // ...greys,
  // ...blues,
  // ...accents,
  // "ld-green": "#5deda2", // TODO
  coral: {
    50: "#FFE2D9",
    400: "#FF7042",
  },
  green: {
    50: "#DEFBEC",
    100: "#BEF8D9",
    300: "#46C899",
    500: "#149566",
    600: "#0F704D",
  },
  mint: {
    50: "#B9F6EB",
    200: "#29E3C1",
  },
  ocean: {
    50: "#D1DCF0",
    100: "#A8BCE1",
    500: "#234C95",
    700: "#183362",
    800: "#0C1A32",
  },
  orange: {
    50: "#FBE5D4",
    400: "#ED8936",
    500: "#CC752C",
  },
  pink: {
    50: "#FED7F3",
    100: "#FEB2E9",
    300: "#FD8CDE",
    400: "#FC42C9",
  },
  purple: {
    50: "#E2DBF7",
    100: "#CABCF1",
    200: "#B19CEA",
    400: "#805EDD",
  },
  red: {
    50: "#FCD3D3",
    100: "#FAADAD",
    300: "#F56260",
    400: "#F23C3A",
    500: "#D43130",
    600: "#B52725",
  },
  sky: {
    50: "#D4E7FC",
    100: "#AED1F9",
    300: "#6DB0FC",
    400: "#3D91F0",
    600: "#2769B4",
    700: "#1D5696",
    900: "#072E5A",
  },
  space: {
    300: "#4D5D8A",
    600: "#1F2942",
    700: "#182134",
  },
  stone: {
    50: "#F1F3F8",
    100: "#D7D8DF",
    300: "#9C9FB1",
    400: "#7C8099",
    500: "#5D6280",
  },
  storm: {
    50: "#A4C3DA",
    200: "#7A96AB",
    500: "#354C5C",
    600: "#192E3D",
    800: "#101D27",
  },
};

const configurableColors: IThemeColors = {
  primary: withOpacity("--color-primary"),
  "acc-1": withOpacity("--color-acc-1"),
  "background-acc-1": withOpacity("--color-background-acc-1"),
  "background-acc-start": withOpacity("--color-background-acc-start"),
  "button-1": withOpacity("--color-button-1"),
  "link-1": withOpacity("--color-link-1"),
  "button-2": withOpacity("--color-button-2"),
  "link-2": withOpacity("--color-link-2"),
  "link-light": withOpacity("--color-link-light"),
  "background-light": `rgba(var(--color-link-1), 0.08)`,
  "code-background": withOpacity("--color-code-background"),
};

const colors = { ...staticColors, ...configurableColors };

export default colors;

// Can override these values by passing this object with different values to
// `applyTheme`
export const baseColorVariableValues: IThemeRGB = {
  "rgb-primary": "12, 26, 50", // ocean-800
  "rgb-acc-1": "252, 66, 201", // pink-400
  "rgb-background-acc-1": "24, 33, 52", // space-700
  "rgb-background-acc-start": "31, 41, 66", // space-600
  "rgb-button-1": "61, 145, 240", // sky-400
  "rgb-link-1": "39, 105, 180", // sky-600
  "rgb-button-2": "39, 105, 180", // sky-600
  "rgb-link-2": "61, 145, 240", // sky-400
  "rgb-link-light": "109, 176, 252", // sky-300
  "rgb-code-background": "30, 40, 66", // space-600
};

// Reference for using CSS variables in Tailwind:
// https://tailwindcss.com/docs/customizing-colors#using-css-variables
function withOpacity(variableName: keyof IThemeVariables): string {
  return `rgba(var(${variableName}), <alpha-value>)`;
}
