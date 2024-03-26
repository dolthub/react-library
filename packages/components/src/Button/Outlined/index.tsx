import cx from "classnames";
import React from "react";
import { Props } from "../types";
import css from "./index.module.css";

function Outlined({
  children,
  className,
  icon,
  color = "default",
  size = "medium",
  shape = "default",
  ...props
}: Props) {
  return (
    <button
      className={cx(
        css.buttonOutlined,
        css[`color-${color}`],
        css[`shape-${shape}`],
        css[`size-${size}`],
        { [css.withIcon]: !!icon },
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

export default Outlined;
