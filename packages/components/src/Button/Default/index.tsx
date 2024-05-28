import cx from "classnames";
import React from "react";
import ButtonLoader from "../Loader";
import { Props } from "../types";
import css from "./index.module.css";

function Button({
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
        css.button,
        css[`color-${color}`],
        css[`shape-${shape}`],
        css[`size-${size}`],
        { [css.withIcon]: !!icon },
        className,
      )}
      type="button"
      data-testid="default-button"
      // These props need to come last
      {...props}
    >
      {loading ? (
        <div className={css.loader}>
          <ButtonLoader loaded={false} />
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

export default Button;
