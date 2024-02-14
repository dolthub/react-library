import cx from "classnames";
import React, { ReactNode } from "react";
import css from "./index.module.css";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function SuccessMsg({ children, className }: Props) {
  return <div className={cx(css.successMsg, className)}>{children}</div>;
}
