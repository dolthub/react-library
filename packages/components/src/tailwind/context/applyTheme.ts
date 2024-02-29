import { IThemeRGB, IThemeVariables } from "../types";

// Should be used to apply the theme to the root element of the app. Will use
// base colors in `theme/base/colors.ts` if no overrides are provided.
export default function applyTheme(themeRGB: IThemeRGB) {
  const themeObject: IThemeVariables = mapTheme(themeRGB);
  const root = document.documentElement;

  Object.keys(themeObject).forEach(v => {
    const propertyVal = themeObject[v as keyof IThemeVariables];
    const validation = validateRGB(propertyVal);
    if (!validation) {
      throw new Error(`Invalid RGB value for ${v}: ${propertyVal}`);
    }

    root.style.setProperty(v, propertyVal);
  });
}

function mapTheme(rgb: IThemeRGB): IThemeVariables {
  return {
    "--color-primary": rgb["rgb-primary"] ?? "",
    "--color-acc-1": rgb["rgb-acc-1"] ?? "",
    "--color-background-acc-1": rgb["rgb-background-acc-1"] ?? "",
    "--color-background-acc-start": rgb["rgb-background-acc-start"] ?? "",
    "--color-button-1": rgb["rgb-button-1"] ?? "",
    "--color-link-1": rgb["rgb-link-1"] ?? "",
    "--color-button-2": rgb["rgb-button-2"] ?? "",
    "--color-link-2": rgb["rgb-link-2"] ?? "",
    "--color-link-light": rgb["rgb-link-light"] ?? "",
  };
}

function validateRGB(rgb: string): boolean {
  if (!rgb) return true;
  const rgbRegex = /^(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})$/;
  return rgbRegex.test(rgb);
}
