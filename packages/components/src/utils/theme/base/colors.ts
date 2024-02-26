const staticColors = {
  primary: "#010a40",
  "acc-grey": "#b2c0c4",
  "acc-red": "#ff9a99",
};

const colors = {
  ...staticColors,
  // primary: withOpacity("--color-primary"),
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

export default colors;

// Reference for using CSS variables in Tailwind:
// https://tailwindcss.com/docs/customizing-colors#using-css-variables

function withOpacity(variableName: string): string {
  return `rgb(var(${variableName}), <alpha-value>)`;
}
