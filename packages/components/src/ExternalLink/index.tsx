import cx from "classnames";
import React, { ReactNode } from "react";
import css from "./index.module.css";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  ["data-cy"]?: string;
};

export default function ExternalLink(props: Props) {
  return (
    <a
      {...props}
      className={cx(css.link, props.className)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
    </a>
  );
}
