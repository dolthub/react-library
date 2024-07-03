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
  const label = `${props.labelPrefix}-${props.data.value}`;
  return (
    <div
      className={cx({
        [css.optionWithIconPath]: !!props.data.iconPath,
        [css.optionWithDetails]: !!props.data.details,
      })}
      aria-label={label}
      data-cy={label}
    >
      {props.data.iconPath && (
        <img src={props.data.iconPath} alt={props.data.label} />
      )}
      {props.data.icon}
      <span className={cx({})}>{props.data.label}</span>
      {props.data.details && (
        <div className={css.optionDetails}>{props.data.details}</div>
      )}
    </div>
  );
}
