import cx from "classnames";
import React, { ReactNode } from "react";
import Button from "../Button";
import ErrorMsg from "../ErrorMsg";
import css from "./index.module.css";

type Props = {
  onCancel?: () => void;
  error?: Error;
  children: ReactNode;
  className?: string;
  left?: boolean;
  stackedButton?: boolean;
  right?: boolean;
  ["data-cy"]?: string;
};

export default function ButtonsWithError({
  children,
  onCancel,
  error,
  className,
  left = false,
  stackedButton = false,
  right = false,
  ...props
}: Props) {
  return (
    <div className={className} aria-label="buttons-with-error">
      <Button.Group
        className={cx(css.group, {
          [css.left]: left,
          [css.stackedButton]: stackedButton,
          [css.right]: right,
        })}
        data-cy={props["data-cy"]}
      >
        {children}
        {!!onCancel && (
          <Button.Link
            onClick={onCancel}
            data-cy="cancel-button"
            className={css.cancel}
          >
            cancel
          </Button.Link>
        )}
      </Button.Group>
      <ErrorMsg
        className={cx(css.error, {
          [css.left]: left,
          [css.right]: right,
        })}
        err={error}
      />
    </div>
  );
}
