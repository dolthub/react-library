import cx from "classnames";
import React, { forwardRef } from "react";
import css from "./index.module.css";

type Props = {
  label?: string;
  description?: string;
  onChangeString?: (value: string) => void;
  hasError?: boolean;
  light?: boolean;
  inputref?: React.RefObject<HTMLTextAreaElement>;
  horizontal?: boolean;
  mobileFriendly?: boolean;
} & React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

// eslint-disable-next-line prefer-arrow-callback
export default forwardRef<HTMLTextAreaElement, Props>(function Textarea(
  {
    label,
    description,
    className,
    onChange,
    onChangeString,
    placeholder = "",
    hasError = false,
    light = false,
    horizontal = false,
    mobileFriendly = false,
    ...textAreaProps
  }: Props,
  ref,
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
      aria-label="textarea-container"
      data-cy="textarea-container"
    >
      {label && <div className={css.label}>{label}</div>}
      {description && <p>{description}</p>}
      <textarea
        {...textAreaProps}
        className={cx(css.textarea, {
          [css.mobileFriendlyTextarea]: mobileFriendly,
          [css.error]: hasError,
          [css.bgwhite]: light,
        })}
        placeholder={placeholder}
        onChange={e =>
          onChangeString ? onChangeString(e.target.value) : onChange?.(e)
        }
        ref={ref}
        aria-label={textAreaProps["aria-label"] || "textarea"}
      />
    </div>
  );
});
