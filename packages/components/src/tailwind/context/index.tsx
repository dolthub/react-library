import React, { createContext, useContext, useEffect } from "react";
import { baseColorVariableValues } from "../theme/base/colors";
import { IThemeColors, IThemeRGB } from "../types";
import applyTheme from "./applyTheme";
import { rgbToHex } from "./utils";

type Props = {
  children: React.ReactNode;
  themeRGBOverrides?: IThemeRGB;
};

type ThemeContextType = {
  themeRGB: IThemeRGB;
  convertThemeRGBToHex: () => IThemeColors;
};

const ThemeContext = createContext<ThemeContextType>({
  themeRGB: baseColorVariableValues,
  convertThemeRGBToHex: () => ({}),
});

// ThemedProvider applies tailwind theme default, potentially with provided overrides
export default function ThemeProvider(props: Props) {
  const themeRGB: IThemeRGB = {
    ...baseColorVariableValues,
    ...(props.themeRGBOverrides ?? {}),
  };

  useEffect(() => {
    applyTheme(themeRGB);
  }, []);

  // Converts the theme from RGB to Hex
  function convertThemeRGBToHex(): IThemeColors {
    const hexThemeRGB: IThemeColors = {};
    Object.keys(themeRGB).forEach(key => {
      const rgb = themeRGB[key as keyof IThemeRGB];
      if (!rgb) return "";
      const color = key.replace("rgb-", "");
      hexThemeRGB[color as keyof IThemeColors] = rgbToHex(rgb);
    });
    return hexThemeRGB;
  }

  return (
    <ThemeContext.Provider value={{ themeRGB, convertThemeRGBToHex }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
