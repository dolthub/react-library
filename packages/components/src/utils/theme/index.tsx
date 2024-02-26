import React, { useEffect } from "react";
import useTailwindTheme from "../useTailwindTheme";

type Props = {
  children: React.ReactNode;
};

export default function ThemeWrapper(props: Props) {
  const { applyTheme } = useTailwindTheme();

  useEffect(() => {
    applyTheme();
  }, []);

  return props.children;
}
