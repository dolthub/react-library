import cx from "classnames";
import React, { ReactNode } from "react";
import Button from "../Button";
import css from "./index.module.css";

type Props = {
  onCancel: () => void;
  children: ReactNode;
  left?: boolean;
  className?: string;
  ["data-cy"]?: string;
  stackedButton?: boolean;
};

export default function ButtonsNoError({
  children,
  onCancel,
  left = false,
  stackedButton = false,
  ...props
}: Props) {
  return (
    <div {...props} aria-label="buttons-no-error">
      <Button.Group
        className={cx(
          css.group,
          { [css.left]: left },
          { [css.stackedButton]: stackedButton },
        )}
      >
        {children}
        <Button.Link onClick={onCancel}>cancel</Button.Link>
      </Button.Group>
    </div>
  );
}
