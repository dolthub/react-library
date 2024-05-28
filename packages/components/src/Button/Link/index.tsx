import cx from "classnames";
import React from "react";
import { Props } from "../types";
import css from "./index.module.css";

type LinkProps = Props & {
  underlined?: boolean;
};

function Link({
  children,
  className,
  icon,
  color = "default",
  size = "medium",
  underlined = false,
  ...props
}: LinkProps) {
  return (
    <button
      className={cx(
        css.buttonLink,
        css[`color-${color}`],
        css[`size-${size}`],
        {
          [css.withIcon]: !!icon,
          [css.underlined]: underlined,
        },
        className,
      )}
      type="button"
      // These props need to come last
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

export default Link;
