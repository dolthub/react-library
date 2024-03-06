import { useOnClickOutside } from "@dolthub/react-hooks";
import { RiMenu5Line } from "@react-icons/all-files/ri/RiMenu5Line";
import cx from "classnames";
import React, { ReactNode, useRef } from "react";
import Btn from "../Btn";
import css from "./index.module.css";

type Props = {
  children: ReactNode;
  showDropdown: boolean;
  setShowDropdown: (s: boolean) => void;
  buttonClassName: string;
  padding?: boolean;
  forRow?: boolean;
  ["data-cy"]?: string;
};

export default function CellDropdown({
  setShowDropdown,
  forRow = false,
  padding = false,
  ...props
}: Props) {
  const toggle = () => setShowDropdown(!props.showDropdown);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdownRef, () => setShowDropdown(false));

  return (
    <div
      ref={dropdownRef}
      className={cx(css.cellDropdown, {
        [css.cellDropdownForRow]: forRow,
      })}
    >
      <Btn
        onClick={toggle}
        className={cx(
          css.button,
          { [css.rowButton]: forRow },
          props.buttonClassName,
        )}
        data-cy={props["data-cy"]}
        // data-cy={`${props.isMobile ? "mobile-" : "desktop-"}${
        //   forRow ? "row-dropdown-button" : props.dataCySuffix
        // }`}
      >
        <RiMenu5Line className={css.icon} />
      </Btn>
      {props.showDropdown && (
        <div
          className={cx(css.dropdown, {
            [css.rowDropdown]: forRow,
            [css.padding]: padding,
          })}
        >
          {props.children}
        </div>
      )}
    </div>
  );
}
