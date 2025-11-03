import { FiCheck } from "@react-icons/all-files/fi/FiCheck";
import cx from "classnames";
import React, { ReactElement } from "react";
import { OptionProps, components } from "react-select";
import { Option, OptionTypeBase } from "../types";
import CustomOption from "./CustomOption";
import css from "./index.module.css";

export default function OptionComponent<
  T,
  OptionType extends Option<T>,
  IsMulti extends boolean,
>(props: OptionProps<OptionType, IsMulti>): ReactElement {
  const ReactSelectOption = components.Option as any;
  return (
    <ReactSelectOption {...props}>
      <CustomOption data={props.data} labelPrefix="select-option" />
    </ReactSelectOption>
  );
}

export function OptionForGroup<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean,
>(props: OptionProps<OptionType, IsMulti>): ReactElement {
  const ReactSelectOptionForGroup = components.Option as any;
  return (
    <ReactSelectOptionForGroup {...props} className={css.option}>
      <FiCheck
        className={cx(css.check, { [css.checkInvisible]: !props.isSelected })}
      />
      <CustomOption data={props.data} labelPrefix="select-option" />
    </ReactSelectOptionForGroup>
  );
}
