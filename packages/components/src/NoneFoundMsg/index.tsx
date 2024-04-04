import cx from "classnames";
import React, { ReactNode } from "react";
import css from "./index.module.css";

type Props = {
  ["data-cy"]?: string;
  className?: string;
  children: ReactNode;
};

export default function NoneFoundMsg(props: Props) {
  return (
    <p
      data-cy={props["data-cy"]}
      className={cx(css.container, props.className)}
    >
      {props.children}
    </p>
  );
}
