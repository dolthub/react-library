import cx from "classnames";
import React from "react";
import {
  GroupBase,
  MenuProps,
  OptionsOrGroups,
  components,
} from "react-select";
import Btn from "../../Btn";
import { CustomGroupBase, OptionTypeBase } from "../types";
import css from "./index.module.css";

export type GroupIndexProps = {
  selectedGroupIndex: number;
  setSelectedGroupIndex: (i: number) => void;
};

function Tabs<T, OptionType extends OptionTypeBase<T>>(
  props: {
    options: OptionsOrGroups<OptionType, GroupBase<OptionType>>;
  } & GroupIndexProps,
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

function GroupNoOptions<T, OptionType extends OptionTypeBase<T>>(
  props: {
    options: OptionsOrGroups<OptionType, CustomGroupBase<OptionType>>;
  } & { selectedGroupIndex: number },
) {
  if (props.options.length > 0) {
    const activeGroup = props.options[props.selectedGroupIndex];
    if ("options" in activeGroup) {
      if (activeGroup.options.length > 0) {
        return null;
      }
      return (
        <div className={css.noOpts}>
          {activeGroup.noOptionsMsg ?? "No options"}
        </div>
      );
    }
  }
  return <div className={css.noOpts}>No options</div>;
}

function Footer<T, OptionType extends OptionTypeBase<T>>(
  props: {
    options: OptionsOrGroups<OptionType, CustomGroupBase<OptionType>>;
  } & { selectedGroupIndex: number },
) {
  const activeGroup = props.options[props.selectedGroupIndex];
  if (!("footer" in activeGroup)) return null;
  return <div className={css.footer}>{activeGroup.footer}</div>;
}

export default function Menu<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean,
>({
  children,
  ...props
}: MenuProps<OptionType, IsMulti, CustomGroupBase<OptionType>> &
  GroupIndexProps) {
  return (
    <components.Menu {...props}>
      <Tabs {...props} options={props.selectProps.options} />
      {children}
      <GroupNoOptions {...props} options={props.selectProps.options} />
      <Footer {...props} options={props.selectProps.options} />
    </components.Menu>
  );
}
