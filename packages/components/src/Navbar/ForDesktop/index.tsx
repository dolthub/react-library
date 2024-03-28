import cx from "classnames";
import React, { ReactNode } from "react";
import css from "./index.module.css";

type Props = {
  leftLinks: ReactNode;
  logo: ReactNode;
  rightLinks: ReactNode;
  className?: string;
  bgColor?: string;
  large?: boolean;
  dark?: boolean;
  logoLeft?: boolean;
};

export default function DesktopNavbar(props: Props) {
  return (
    <div
      className={cx(
        css.container,
        props.bgColor ?? "bg-background-acc-1",
        { [css.large]: props.large, [css.dark]: props.dark },
        props.className,
      )}
    >
      <div
        className={cx(css.inner, {
          [css.dark]: props.dark,
          [css.logoLeft]: props.logoLeft,
        })}
      >
        <div className={css.left}>{props.leftLinks}</div>
        <div className={css.logo}>{props.logo}</div>
        <div className={css.right}>{props.rightLinks}</div>
      </div>
    </div>
  );
}
