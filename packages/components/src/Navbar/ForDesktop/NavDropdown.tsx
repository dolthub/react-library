import { useOnClickOutside } from "@dolthub/react-hooks";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import cx from "classnames";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import Btn from "../../Btn";
import css from "./NavDropdown.module.css";

type Props = {
  label: ReactNode;
  children: ReactNode;
  // "full" spans the page width. "left"/"right" anchor the panel to the
  // trigger and size it to its content.
  align?: "full" | "left" | "right";
  hideCaret?: boolean;
  // Underlines the trigger while the panel is open.
  underlineOnOpen?: boolean;
  // Opens on hover as well as click. Click still toggles, so the menu stays
  // reachable by keyboard and on touch.
  openOnHover?: boolean;
  defaultOpen?: boolean;
  className?: string;
  triggerClassName?: string;
  panelClassName?: string;
  isOpen?: boolean;
  setIsOpen?: (o: boolean) => void;
  ["data-cy"]?: string;
};

// A nav item with a dropdown panel that dims the page beneath it. Must be
// rendered inside DesktopNavbar, which a full-width panel anchors to.
export default function NavDropdown({
  label,
  children,
  align = "full",
  hideCaret = false,
  underlineOnOpen = false,
  openOnHover = false,
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

  // Closing is delayed so the pointer can cross the gap between the trigger
  // and the panel without the menu snapping shut.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = undefined;
    }
  };
  useEffect(() => cancelClose, []);

  // Bound to the trigger/panel wrapper rather than the root: the scrim is a
  // root child covering the page, so hovering it would pin the menu open.
  const hoverProps = openOnHover
    ? {
        onMouseEnter: () => {
          cancelClose();
          setOpen(true);
        },
        onMouseLeave: () => {
          cancelClose();
          closeTimer.current = setTimeout(() => setOpen(false), 150);
        },
      }
    : {};

  return (
    <div className={cx(css.dropdown, props.className)} ref={ref}>
      {/* Outside the anchor below, so it always covers the full page. */}
      {open && (
        <div className={css.scrim} aria-hidden onClick={() => setOpen(false)} />
      )}
      <div
        className={cx(css.triggerWrap, { [css.anchor]: align !== "full" })}
        {...hoverProps}
      >
        <Btn
          className={cx(
            css.trigger,
            { [css.triggerOpen]: underlineOnOpen && open },
            props.triggerClassName,
          )}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          data-cy={props["data-cy"]}
        >
          <span>{label}</span>
          {!hideCaret &&
            (open ? (
              <FaCaretUp className={css.caret} aria-hidden />
            ) : (
              <FaCaretDown className={css.caret} aria-hidden />
            ))}
        </Btn>
        {open && (
          <div
            className={cx(
              css.panel,
              {
                [css.panelLeft]: align === "left",
                [css.panelRight]: align === "right",
              },
              props.panelClassName,
            )}
            aria-label="nav dropdown panel"
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
