import { FaCaretDown } from "@react-icons/all-files/fa/FaCaretDown";
import { FaCaretUp } from "@react-icons/all-files/fa/FaCaretUp";
import cx from "classnames";
import React, { ReactNode } from "react";
import Popup, { PopupProps } from "../Popup";
import css from "./index.module.css";

export type Props = Partial<PopupProps> & {
  children: ReactNode;
  isOpen?: boolean;
  setIsOpen?: (o: boolean) => void;
  triggerText?: string;
  buttonClassName?: string;
  ["data-cy"]?: string;
};

export default function ButtonWithPopup({
  children,
  isOpen,
  setIsOpen,
  triggerText,
  ...props
}: Props) {
  const openProps: Partial<PopupProps> =
    isOpen !== undefined && setIsOpen !== undefined
      ? {
          open: isOpen,
          onOpen: () => setIsOpen(true),
          onClose: () => setIsOpen(false),
        }
      : {};
  return (
    <Popup
      {...openProps}
      position="bottom right"
      on="click"
      offsetX={triggerText ? 32 : 0}
      contentStyle={{ width: "10rem" }}
      closeOnDocumentClick
      trigger={open => (
        <button
          type="button"
          className={cx(
            css.triggerButton,
            { [css.withoutText]: !triggerText },
            props.buttonClassName,
          )}
          data-cy={props["data-cy"]}
        >
          {triggerText}
          {open ? (
            <FaCaretUp
              className={cx(css.caret, {
                [css.caretWithoutText]: !triggerText,
              })}
            />
          ) : (
            <FaCaretDown
              className={cx(css.caret, {
                [css.caretWithoutText]: !triggerText,
              })}
            />
          )}
        </button>
      )}
      // props must come last to override default props above
      {...props}
    >
      {children}
    </Popup>
  );
}
