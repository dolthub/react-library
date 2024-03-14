import cx from "classnames";
import React from "react";
import { Option } from "../types";
import css from "./index.module.css";

export default function CustomOption<T, OptionType extends Option<T>>(props: {
  data: OptionType;
}) {
  return (
    <span className={cx({ [css.withIconPath]: !!props.data.iconPath })}>
      {props.data.iconPath && (
        <img src={props.data.iconPath} alt={props.data.label} />
      )}
      {props.data.icon}
      <span>{props.data.label}</span>
      {props.data.details}
    </span>
  );
}
