import cx from "classnames";
import React, { ReactNode } from "react";
import { Props } from "./index.types";

export default function Button({
  children,
  className,
  red = false,
  pill = false,
  green = false,
  gradientBg = false,
  white = false,
  ...props
}: Props): ReactNode {
  return (
    <button
      className={cx(
        "button",
        {
          red: red,
          // [css.greenBg]: green,
          // [css.pill]: pill,
          // [css.gradientBg]: gradientBg,
          // [css.whiteBg]: white,
        },
        className
      )}
      type="button"
      // These props need to come last
      {...props}
    >
      {children}
    </button>
  );
}
