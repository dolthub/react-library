import React from "react";
import { MenuListProps, components } from "react-select";
import { CustomGroupBase, OptionTypeBase } from "../types";
import css from "./index.module.css";

export default function MenuList<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean,
>({
  children,
  ...props
}: MenuListProps<OptionType, IsMulti, CustomGroupBase<OptionType>> & {
  selectedGroupIndex: number;
}) {
  const activeGroup =
    props.options.length - 1 >= props.selectedGroupIndex
      ? props.options[props.selectedGroupIndex]
      : undefined;

  const filteredChildren = React.Children.toArray(children).filter(group => {
    if (typeof group === "string" || typeof group === "number") {
      return false;
    }
    if (!("props" in group)) return false;
    return group.props.data?.label === activeGroup?.label;
  });

  return (
    <components.MenuList {...props} className={css.menuList}>
      {filteredChildren}
    </components.MenuList>
  );
}
