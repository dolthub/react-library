import cx from "classnames";
import React from "react";
import CommentForm from "./Inner";
import css from "./index.module.css";
import { CommonProps } from "./types";

type Props = CommonProps & {
  className?: string;
};

export default function ForMobile(props: Props) {
  return (
    <div className={cx(css.mobileForm, props.className)}>
      <CommentForm {...props} separateTabs>
        {props.children}
      </CommentForm>
    </div>
  );
}
