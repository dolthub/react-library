import React, { useEffect } from "react";
import applyTheme from "./applyTheme";

type Props = {
  children: React.ReactNode;
};

export default function ThemeWrapper(props: Props) {
  useEffect(() => {
    applyTheme();
  }, []);

  return props.children;
}
