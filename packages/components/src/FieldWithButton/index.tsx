import cx from "classnames";
import React, { ReactNode } from "react";
import css from "./index.module.css";

export type CommonProps = {
  label?: string;
  value: string;
  hideValue?: boolean;
  children?: ReactNode;
  blue?: boolean;
  help?: ReactNode;
  blur?: boolean;
  labelClassName?: string;
  className?: string;
  smallValue?: boolean;
  vertical?: boolean;
  valueForHidden?: string;
};

type Props = CommonProps & {
  buttonActive?: boolean;
  button?: ReactNode;
};

export default function FieldWithButton(props: Props) {
  return (
    <div
      className={cx(
        css.field,
        { [css.verticalField]: !!props.vertical },
        props.className,
      )}
      data-cy={`copyable-field-${
        props.label ? props.label.toLowerCase() : "item"
      }`}
    >
      <div className={cx(css.label, props.labelClassName)}>
        {props.label}
        {props.label ? ":" : ""}
      </div>
      <div className={css.valueWrapper}>
        {props.hideValue || !props.value ? (
          (props.valueForHidden ?? "")
        ) : (
          <div className={css.valContainer}>
            {props.help}
            <div
              className={cx(css.value, {
                [css.blueValue]: !!props.blue,
                [css.smallValue]: !!props.smallValue,
              })}
            >
              <span
                className={cx({
                  [css.blurValue]: !!props.blur && !props.buttonActive,
                })}
              >
                {props.buttonActive ? "Copied to clipboard" : props.value}
              </span>
              {props.button}
            </div>
          </div>
        )}
        {(!props.hideValue || props.valueForHidden) && props.children}
      </div>
    </div>
  );
}
