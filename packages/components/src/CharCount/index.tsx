import cx from "classnames";
import React from "react";
import css from "./index.module.css";

export const maxChar = 2048;

type Props = {
  desc: string;
  className?: string;
};

export default function CharCount(props: Props) {
  return (
    <span
      className={cx(css.charCount, props.className, {
        [css.charCountOver]: props.desc.length > maxChar,
      })}
    >
      {props.desc.length}/{maxChar}
    </span>
  );
}
