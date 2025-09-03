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
  const OptionComponent = components.Option as any;
  return (
    <OptionComponent {...props}>
      <CustomOption data={props.data} labelPrefix="select-option" />
    </OptionComponent>
  );
}

export function OptionForGroup<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean,
>(props: OptionProps<OptionType, IsMulti>): ReactElement {
  const OptionForGroupComponent = components.Option as any;
  return (
    <OptionForGroupComponent {...props} className={css.option}>
      <FiCheck
        className={cx(css.check, { [css.checkInvisible]: !props.isSelected })}
      />
      <CustomOption data={props.data} labelPrefix="select-option" />
    </OptionForGroupComponent>
  );
}
