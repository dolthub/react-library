import cx from "classnames";
import React from "react";
import css from "./index.module.css";

type Props = {
  label?: string;
  hasError?: boolean;
  light?: boolean;
  onChangeString?: (s: string) => void;
  horizontal?: boolean;
  description?: string;
  pill?: boolean;
  blue?: boolean;
  blueText?: boolean;
  mobileFriendly?: boolean;
  labelClassName?: string;
  inputClassName?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

function FormInput(
  {
    label,
    className,
    labelClassName,
    inputClassName,
    onChange,
    onChangeString,
    placeholder = "",
    hasError = false,
    light = false,
    horizontal = false,
    mobileFriendly = false,
    blue = false,
    blueText = false,
    type = "text",
    description,
    pill = false,
    ...inputProps
  }: Props,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <div
      className={cx(
        css.container,
        {
          [css.horizontal]: horizontal,
          [css.mobileFriendly]: mobileFriendly,
        },
        className,
      )}
      aria-label="form-input-container"
    >
      {label && (
        <div
          className={cx(
            css.label,
            { [css.horizontalLabel]: horizontal },
            labelClassName,
          )}
        >
          {label}
        </div>
      )}
      {description && <p className={css.description}>{description}</p>}
      <input
        {...inputProps}
        className={cx(css.input, inputClassName, {
          [css.error]: hasError,
          [css.mobileFriendlyInput]: mobileFriendly,
          [css.bgwhite]: light,
          [css.pill]: pill,
          [css.blue]: blue,
          [css.blueText]: blueText,
        })}
        onChange={e =>
          onChangeString ? onChangeString(e.target.value) : onChange?.(e)
        }
        type={type}
        placeholder={placeholder}
        ref={ref}
      />
    </div>
  );
}

export default React.forwardRef<HTMLInputElement, Props>(FormInput);
