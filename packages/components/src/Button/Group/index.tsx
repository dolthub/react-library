import cx from "classnames";
import React from "react";
import css from "./index.module.css";

type GroupProps = {
  children: React.ReactNode;
  className?: string;
};

function Group({ children, className }: GroupProps) {
  return (
    <div className={cx(css.group, className)} aria-label="button-group">
      {children}
    </div>
  );
}

export default Group;
