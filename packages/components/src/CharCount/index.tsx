import cx from "classnames";
import React from "react";
import css from "./index.module.css";

export const maxChar = 2048;

type Props = {
  desc: string;
  className?: string;
  maxChar?: number;
};

export default function CharCount(props: Props) {
  const charLimit = props.maxChar ?? maxChar;
  return (
    <span
      className={cx(css.charCount, props.className, {
        [css.charCountOver]: props.desc.length > charLimit,
      })}
    >
      {props.desc.length}/{charLimit}
    </span>
  );
}
