import React from "react";
import { MenuListProps, components } from "react-select";
import { CustomGroupBase, CustomGroupedProps, OptionTypeBase } from "../types";
import css from "./index.module.css";

export default function MenuList<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean,
>({
  children,
  ...props
}: MenuListProps<OptionType, IsMulti, CustomGroupBase<OptionType>> &
  CustomGroupedProps) {
  const filteredChildren = React.Children.toArray(children).filter(
    (_, index) => index === props.selectedGroupIndex,
  );

  const activeGroup = props.options[props.selectedGroupIndex];

  return (
    <components.MenuList {...props} className={css.menuList}>
      {filteredChildren}
      {"footer" in activeGroup && (
        <div className={css.footer}>{activeGroup.footer}</div>
      )}
    </components.MenuList>
  );
}
