import cx from "classnames";
import React from "react";
import {
  GroupBase,
  MenuProps,
  OptionsOrGroups,
  components,
} from "react-select";
import Btn from "../../Btn";
import { CustomGroupedProps, OptionTypeBase } from "../types";
import css from "./index.module.css";

function Tabs<T, OptionType extends OptionTypeBase<T>>(
  props: {
    options: OptionsOrGroups<OptionType, GroupBase<OptionType>>;
  } & CustomGroupedProps,
) {
  return (
    <div className={css.menuWithTabs}>
      {props.options.map((option, index) => (
        <Btn
          key={option.label}
          onClick={() => props.setSelectedGroupIndex(index)}
          className={cx(css.tab, {
            [css.activeTab]: index === props.selectedGroupIndex,
          })}
        >
          {option.label}
        </Btn>
      ))}
    </div>
  );
}

export default function Menu<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean,
>({
  children,
  ...props
}: MenuProps<OptionType, IsMulti, GroupBase<OptionType>> & CustomGroupedProps) {
  return (
    <components.Menu {...props}>
      <Tabs {...props} options={props.selectProps.options} />
      {children}
    </components.Menu>
  );
}
