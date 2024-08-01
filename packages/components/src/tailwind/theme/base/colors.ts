import tailwindColors from "tailwindcss/colors";
import { IThemeColors, IThemeVariables } from "../../types";

const extendedTailwindColors = {
  amber: tailwindColors.amber,
  current: "currentColor",
  indigo: tailwindColors.indigo,
  transparent: "transparent",
  white: "#ffffff",
  yellow: tailwindColors.yellow,
};

export const staticColors = {
  coral: {
    50: "#FFE2D9",
    400: "#FF7042",
  },
  green: {
    50: "#DEFBEC",
    100: "#BEF8D9",
    300: "#5DEDA2",
    400: "#19BA80",
    500: "#149566",
    600: "#0F704D",
  },
  mint: {
    50: "#B9F6EB",
    200: "#29E3C1",
    300: "#5DEDA2",
  },
  ocean: {
    50: "#D1DCF0",
    100: "#A8BCE1",
    300: "#557DC4",
    400: "#2B5DB6",
    500: "#234C95",
    600: "#1B3B74",
    700: "#183362",
    800: "#0C1A32",
  },
  orange: {
    50: "#FBE5D4",
    200: "#F4B785",
    300: "#F1A05D",
    400: "#FF820F",
    500: "#CC752C",
  },
  pink: {
    50: "#FED7F3",
    100: "#FEB2E9",
    200: "#FD8CDE",
    300: "#FD67D4",
    400: "#FC42C9",
  },
  purple: {
    50: "#E2DBF7",
    100: "#CABCF1",
    200: "#B19CEA",
    300: "#997DE4",
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
    500: "#327DD2",
    700: "#1D5696",
    900: "#072E5A",
  },
  space: {
    300: "#4D5D8A",
    500: "#202F57",
    600: "#1F2942",
    700: "#182134",
  },
  stone: {
    50: "#F1F3F8",
    100: "#D7D8DF",
    300: "#9C9FB1",
    400: "#7C8099",
    500: "#5D6280",
    600: "#4C5068",
    700: "#3B3E51",
  },
  storm: {
    50: "#A4C3DA",
    200: "#7A96AB",
    500: "#354C5C",
    600: "#192E3D",
    700: "#142631",
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

const colors = {
  ...staticColors,
  ...extendedTailwindColors,
  ...configurableColors,
};

export default colors;

// Reference for using CSS variables in Tailwind:
// https://tailwindcss.com/docs/customizing-colors#using-css-variables
function withOpacity(variableName: keyof IThemeVariables): string {
  return `rgba(var(${variableName}), <alpha-value>)`;
}
