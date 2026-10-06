import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import cx from "classnames";
import React, { ReactNode, useState } from "react";
import Btn from "../../Btn";
import css from "./NavDropdown.module.css";

type Props = {
  label: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  isOpen?: boolean;
  setIsOpen?: (o: boolean) => void;
  ["data-cy"]?: string;
};

// A nav item that expands in place, pushing the items below it down.
export default function NavDropdown({
  label,
  children,
  defaultOpen = false,
  isOpen,
  setIsOpen,
  ...props
}: Props) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const controlled = isOpen !== undefined && setIsOpen !== undefined;
  const open = controlled ? isOpen : uncontrolledOpen;
  const toggle = () => {
    if (controlled) {
      setIsOpen(!isOpen);
    } else {
      setUncontrolledOpen(!uncontrolledOpen);
    }
  };

  return (
    <div className={cx(css.dropdown, props.className)}>
      <Btn
        className={css.trigger}
        aria-expanded={open}
        onClick={toggle}
        data-cy={props["data-cy"]}
      >
        <span>{label}</span>
        <span className={css.caret} aria-hidden>
          {open ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </Btn>
      {open && (
        <div
          className={css.panel}
          aria-label="nav dropdown panel"
          data-nav-panel
        >
          {children}
        </div>
      )}
    </div>
  );
}
