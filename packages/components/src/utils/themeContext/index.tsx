import React, { useEffect } from "react";
import useTailwindTheme from "../useTailwindTheme";

type ThemeContextType = {};

const ThemeContext = React.createContext<ThemeContextType>({});

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider(props: Props) {
  const { applyTheme } = useTailwindTheme();

  useEffect(() => {
    applyTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{}}>{props.children}</ThemeContext.Provider>
  );
}
