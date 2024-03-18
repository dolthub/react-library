import cx from "classnames";
import React from "react";
import { Option } from "../types";
import css from "./index.module.css";

type Props<OptionType> = {
  data: OptionType;
  labelPrefix: string;
};

export default function CustomOption<T, OptionType extends Option<T>>(
  props: Props<OptionType>,
) {
  return (
    <div
      className={cx({ [css.optionWithIconPath]: !!props.data.iconPath })}
      aria-label={`${props.labelPrefix}-${props.data.value}`}
      data-cy={`${props.labelPrefix}-${props.data.value}`}
    >
      {props.data.iconPath && (
        <img src={props.data.iconPath} alt={props.data.label} />
      )}
      {props.data.icon}
      <span>{props.data.label}</span>
      {props.data.details && (
        <div className={css.optionDetails}>{props.data.details}</div>
      )}
    </div>
  );
}
