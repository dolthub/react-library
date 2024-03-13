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
      trigger={open =>
        getTriggerButton(
          open,
          triggerText,
          props.buttonClassName,
          props["data-cy"],
        )
      }
      // props must come last to override default props above
      {...props}
    >
      {children}
    </Popup>
  );
}

function getTriggerButton(
  open: boolean,
  triggerText?: string,
  buttonClassName?: string,
  dataCy?: string,
): JSX.Element {
  return (
    <button
      type="button"
      className={cx(
        css.triggerButton,
        { [css.withoutText]: !triggerText },
        buttonClassName,
      )}
      data-cy={dataCy}
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
  );
}
