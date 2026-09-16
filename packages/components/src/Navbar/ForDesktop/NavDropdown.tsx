import { useOnClickOutside } from "@dolthub/react-hooks";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import cx from "classnames";
import React, { ReactNode, useRef, useState } from "react";
import Btn from "../../Btn";
import css from "./NavDropdown.module.css";

type Props = {
  label: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  panelClassName?: string;
  isOpen?: boolean;
  setIsOpen?: (o: boolean) => void;
  ["data-cy"]?: string;
};

// A nav item whose panel spans the page width, dimming the content beneath.
// Must be rendered inside DesktopNavbar, which the panel anchors to.
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
  const ref = useRef<HTMLDivElement>(null);

  const setOpen = (o: boolean) => {
    if (controlled) {
      setIsOpen(o);
    } else {
      setUncontrolledOpen(o);
    }
  };

  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div className={cx(css.dropdown, props.className)} ref={ref}>
      <Btn
        className={css.trigger}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        data-cy={props["data-cy"]}
      >
        <span>{label}</span>
        {open ? (
          <FaCaretUp className={css.caret} aria-hidden />
        ) : (
          <FaCaretDown className={css.caret} aria-hidden />
        )}
      </Btn>
      {open && (
        <>
          <div
            className={css.scrim}
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <div
            className={cx(css.panel, props.panelClassName)}
            aria-label="nav dropdown panel"
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
}
