import { baseColorVariableValues } from "../theme/base/colors";
import { IMappedTheme, ITheme } from "./types";

// Should be used to apply the theme to the root element of the app. Will use
// base colors in `theme/base/colors.ts` if no overrides are provided.
export default function applyTheme(tailwindColorOverrides?: ITheme) {
  const themeObject: IMappedTheme = mapTheme(
    tailwindColorOverrides
      ? extend(baseColorVariableValues, tailwindColorOverrides)
      : baseColorVariableValues,
  );
  const root = document.documentElement;

  Object.keys(themeObject).forEach(property => {
    if (property === "name") {
      return;
    }
    const propertyVal = themeObject[property];
    const validation = validateRGB(propertyVal);
    if (!validation) {
      throw new Error(`Invalid RGB value for ${property}: ${propertyVal}`);
    }

    root.style.setProperty(property, propertyVal);
  });
}

function mapTheme(variables: ITheme): IMappedTheme {
  return {
    "--color-acc-1": variables["rgb-acc-1"] ?? "",
    "--color-background-acc-1": variables["rgb-background-acc-1"] ?? "",
    "--color-background-acc-start": variables["rgb-background-acc-start"] ?? "",
    "--color-button-1": variables["rgb-button-1"] ?? "",
    "--color-link-1": variables["rgb-link-1"] ?? "",
    "--color-button-2": variables["rgb-button-2"] ?? "",
    "--color-link-2": variables["rgb-link-2"] ?? "",
    "--color-link-light": variables["rgb-link-light"] ?? "",
  };
}

function extend(extending: ITheme, newTheme: ITheme): ITheme {
  return { ...extending, ...newTheme };
}

function validateRGB(rgb: string | null): boolean {
  if (!rgb) return true;
  const rgbRegex = /^(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})$/;
  return rgbRegex.test(rgb);
}
