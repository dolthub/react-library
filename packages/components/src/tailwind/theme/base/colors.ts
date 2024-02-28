// TODO: Improve these names
const staticColors = {
  "acc-grey": "#b2c0c4",
  "acc-red": "#ff9a99",
  "acc-green": "#5ac58d",
  "acc-lightgrey": "#c6cdd0",
  "ld-darkgrey": "#95a3a7",
  "ld-lightgrey": "#e1e5e7",
  "ld-lightpurple": "#f1f3f8",
  "ld-lightblue": "#f6f8f9",
  "ld-darkergrey": "#384B52",
  "ld-darkerblue": "#1e2842",
  "ld-darkestblue": "#182134",
  "ld-blue": "#6db0fc",
  "ld-green": "#5deda2",
  "acc-linkblue": "#1f6dc6",
  "acc-hoverlinkblue": "#3d91f0",
  "acc-hoverblue": "#1d2c7f",
  "acc-darkgrey": "#5d6280",
  "acc-hovergreen": "#6fdda4",
  "acc-lightgreen": "#d4f5e4",
  "acc-hoverred": "#fca8a7",
  "acc-code": "#575662",
  "acc-orange": "#ed8936",
  "acc-pink": "#d588d5",
  "acc-bright-green": "#29e3c1",
  "acc-purple": "#805EDD",
};

const configurableColors = {
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
};

const colors = { ...staticColors, ...configurableColors };

export default colors;

// Can override these values by passing this object with different values to
// `applyTheme`
export const baseColorVariableValues = {
  "rgb-primary": "1, 10, 64",
  "rgb-acc-1": "252, 66, 201",
  "rgb-background-acc-1": "24, 33, 52",
  "rgb-background-acc-start": "31, 41, 66",
  "rgb-button-1": "61, 145, 240",
  "rgb-link-1": "31, 109, 198",
  "rgb-button-2": "31, 109, 198",
  "rgb-link-2": "61, 145, 240",
  "rgb-link-light": "109, 176, 252",
};

// Reference for using CSS variables in Tailwind:
// https://tailwindcss.com/docs/customizing-colors#using-css-variables

function withOpacity(variableName: string): string {
  return `rgba(var(${variableName}), <alpha-value>)`;
}