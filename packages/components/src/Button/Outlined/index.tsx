import cx from "classnames";
import React from "react";
import ButtonLoader from "../Loader";
import { Props } from "../types";
import css from "./index.module.css";

function Outlined({
  children,
  className,
  icon,
  color = "default",
  size = "medium",
  shape = "default",
  loading = false,
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
      {loading ? (
        <div className={css.loader}>
          <ButtonLoader loaded={false} color={color} />
          <div className={css.invis}>{children}</div>
        </div>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
}

export default Outlined;
