import { FiCheck } from "@react-icons/all-files/fi/FiCheck";
import cx from "classnames";
import React from "react";
import { OptionProps, components } from "react-select";
import { Option, OptionTypeBase } from "../types";
import CustomOption from "./CustomOption";
import css from "./index.module.css";

export default function OptionComponent<
  T,
  OptionType extends Option<T>,
  IsMulti extends boolean,
>(props: OptionProps<OptionType, IsMulti>): JSX.Element {
  return (
    <components.Option {...props}>
      <CustomOption data={props.data} />
    </components.Option>
  );
}

export function OptionForGroup<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean,
>(props: OptionProps<OptionType, IsMulti>): JSX.Element {
  return (
    <components.Option {...props} className={css.option}>
      <FiCheck
        className={cx(css.check, { [css.checkInvisible]: !props.isSelected })}
      />
      <span
        aria-label={String(props.data.value)}
        data-cy={String(props.data.value)}
      >
        {props.label}
      </span>
    </components.Option>
  );
}