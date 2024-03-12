import cx from "classnames";
import React, { ReactNode } from "react";
import css from "./index.module.css";
import { WrapperProps } from "./types";

export default function Wrapper({
  horizontal = false,
  ...props
}: WrapperProps & { children: ReactNode }) {
  return (
    <div
      className={cx(props.outerClassName, {
        [css.horizontal]: horizontal,
      })}
      data-cy={props["data-cy"]}
    >
      {props.label && (
        <div
          className={cx(
            css.label,
            {
              [css.horizontalLabel]: horizontal,
              [css.smallLabel]: props.small,
            },
            props.labelClassName,
          )}
        >
          {props.label}
        </div>
      )}
      {props.children}
    </div>
  );
}
