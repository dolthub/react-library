import { useOnClickOutside } from "@dolthub/react-hooks";
import { RiMenu5Line } from "@react-icons/all-files/ri/RiMenu5Line";
import cx from "classnames";
import React, { ReactNode, useRef } from "react";
import css from "./index.module.css";

type Props = {
  children: ReactNode;
  showDropdown: boolean;
  setShowDropdown: (s: boolean) => void;
  buttonClassName: string;
  dropdownClassName?: string;
  forRow?: boolean;
  ["data-cy"]?: string;
};

export default function CellDropdown({
  setShowDropdown,
  forRow = false,
  ...props
}: Props) {
  const toggle = () => setShowDropdown(!props.showDropdown);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdownRef, () => setShowDropdown(false));

  return (
    <div ref={dropdownRef} className={css.cellDropdown}>
      <button
        type="button"
        onClick={toggle}
        className={cx(
          css.button,
          { [css.rowButton]: forRow },
          props.buttonClassName,
        )}
        data-cy={props["data-cy"]}
      >
        <RiMenu5Line />
      </button>
      {props.showDropdown && (
        <div
          className={cx(
            css.dropdown,
            {
              [css.rowDropdown]: forRow,
            },
            props.dropdownClassName,
          )}
        >
          {props.children}
        </div>
      )}
    </div>
  );
}
