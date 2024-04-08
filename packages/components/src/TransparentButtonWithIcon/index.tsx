import cx from "classnames";
import React, { ReactElement, ReactNode } from "react";
import ExternalLink from "../ExternalLink";
import css from "./index.module.css";

type Props = {
  children: ReactElement | string;
  href: string;
  ["data-cy"]?: string;
  ["aria-label"]: string;
  icon?: ReactNode;
  dark?: boolean;
  className?: string;
};

export default function TransparentButtonWithIcon({
  children,
  icon,
  dark = false,
  ...props
}: Props) {
  return (
    <ExternalLink {...props}>
      <span
        className={cx(css.button, { [css.darkButton]: dark }, props.className)}
        aria-label="inner transparent button"
      >
        {icon}
        <span className={cx(css.inner, { [css.darkInner]: dark })}>
          {children}
        </span>
      </span>
    </ExternalLink>
  );
}
