import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { tailwindColorTheme } from "../theme/dolthub/colors";
import { IThemeColors, IThemeRGB } from "../types";
import applyTheme from "./applyTheme";
import { rgbToHex } from "./utils";

type Props = {
  children: React.ReactNode;
  themeRGBOverrides?: IThemeRGB;
  updateRGBOnChange?: boolean;
};

type ThemeContextType = {
  themeRGB: IThemeRGB;
  convertThemeRGBToHex: () => IThemeColors;
};

const ThemeContext = createContext<ThemeContextType>({
  themeRGB: tailwindColorTheme,
  convertThemeRGBToHex: () => {
    return {};
  },
});

// ThemedProvider applies tailwind theme default, potentially with provided
// overrides. Must wrap your app root in this provider to use this library.
export default function ThemeProvider(props: Props) {
  const themeRGB: IThemeRGB = useMemo(() => {
    return {
      ...tailwindColorTheme,
      ...(props.themeRGBOverrides ?? {}),
    };
  }, [props.themeRGBOverrides]);

  useEffect(
    () => {
      applyTheme(themeRGB);
    },
    // Must include `themeRGB` in the dependencies array for the storybook theme
    // toggle to work
    props.updateRGBOnChange ? [themeRGB] : [],
  );

  // Converts the theme from RGB to Hex
  const convertThemeRGBToHex = useCallback((): IThemeColors => {
    const hexThemeRGB: IThemeColors = {};
    Object.keys(themeRGB).forEach(key => {
      const rgb = themeRGB[key as keyof IThemeRGB];
      if (rgb) {
        const color = key.replace("rgb-", "");
        hexThemeRGB[color as keyof IThemeColors] = rgbToHex(rgb);
      }
    });
    return hexThemeRGB;
  }, [themeRGB]);

  const value = useMemo(() => {
    return { themeRGB, convertThemeRGBToHex };
  }, [themeRGB, convertThemeRGBToHex]);

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext(): ThemeContextType {
  return useContext(ThemeContext);
}
