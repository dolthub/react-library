import cx from "classnames";
import React from "react";
import css from "./index.module.css";

type Props = {
  name: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  className?: string;
  label?: string;
  description?: string;
};

export default function Radio({
  className,
  description,
  label,
  ...props
}: Props) {
  return (
    <div className={className} data-cy={`${props.name}-radio`}>
      <label
        className={cx(css.container, {
          [css.disabled]: props.disabled,
        })}
        htmlFor={props.name}
      >
        {label}
        <input {...props} type="radio" id={props.name} />
        <span className={css.checkmark} />
      </label>
      {description && (
        <p
          className={cx(css.description, {
            [css.disabledDescription]: !!props.disabled,
          })}
        >
          {description}
        </p>
      )}
    </div>
  );
}
