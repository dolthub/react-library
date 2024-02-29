import cx from "classnames";
import React, {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
} from "react";
import css from "./index.module.css";

type Props = {
  label?: string;
  hasError?: boolean;
  light?: boolean;
  onChangeString?: (s: string) => void;
  horizontal?: boolean;
  description?: string;
  blue?: boolean;
  mobileFriendly?: boolean;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const FormInput = (
  {
    label,
    className,
    onChange,
    onChangeString,
    placeholder = "",
    hasError = false,
    light = false,
    horizontal = false,
    mobileFriendly = false,
    blue = false,
    type = "text",
    description,
    ...inputProps
  }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) => (
  <div
    className={cx(
      css.container,
      {
        [css.horizontal]: horizontal,
        [css.mobileFriendly]: !blue && mobileFriendly,
      },
      className,
    )}
    aria-label="form-input-container"
  >
    {label && <div className={css.label}>{label}</div>}
    {description && <p className={css.description}>{description}</p>}
    <input
      {...inputProps}
      className={cx(css.input, {
        [css.error]: hasError,
        [css.mobileFriendlyInput]: !blue && mobileFriendly,
        [css.bgwhite]: light,
        [css.blue]: blue,
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

export default forwardRef<HTMLInputElement, Props>(FormInput);
