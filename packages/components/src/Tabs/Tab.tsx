import cx from "classnames";
import React, { ReactNode } from "react";
import Btn from "../Btn";
import { useTabsContext } from "./context";
import css from "./index.module.css";

type Props = {
  children: ReactNode;
  className?: string;
  index: number;
  name?: string;
  renderOnlyChild?: boolean;
  hide?: boolean;
  dark?: boolean;
  small?: boolean;
  disabled?: boolean;
};

export default function Tab(props: Props) {
  const { activeTabIndex, setActiveTabIndex } = useTabsContext();
  const isActive = props.index === activeTabIndex;
  const tabLabel = `tab${props.name ? `-${props.name}` : ""}`;
  const label = `${isActive ? "active-" : ""}${tabLabel}`;

  if (props.hide) return null;

  return (
    <li
      data-cy={label}
      aria-label={label}
      className={cx(css.tab, props.className, {
        [css.activeTab]: isActive,
        [css.smallTab]: !!props.small,
        [css.darkTab]: !!props.dark,
      })}
    >
      {props.renderOnlyChild ? (
        props.children
      ) : (
        <Btn
          onClick={() => setActiveTabIndex(props.index)}
          disabled={props.disabled}
        >
          {props.children}
        </Btn>
      )}
    </li>
  );
}
