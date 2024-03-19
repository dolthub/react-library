import cx from "classnames";
import React from "react";
import { GroupBase, SelectComponentsConfig } from "react-select";
import { Option, OptionTypeBase } from "../types";
import Clear from "./Clear";
import Dropdown from "./Dropdown";
import MultiValueRemove from "./MultiValueRemove";
import css from "./index.module.css";

type Components<Option, IsMulti extends boolean> =
  | Partial<SelectComponentsConfig<Option, IsMulti, GroupBase<Option>>>
  | undefined;

export function getComponents<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean,
>(
  components?: Components<OptionType, IsMulti>,
  blue?: boolean,
  light?: boolean,
): Components<OptionType, IsMulti> {
  return {
    ...components,
    IndicatorSeparator: () => null,
    DropdownIndicator: props => (
      <Dropdown {...props} blue={blue} light={light} />
    ),
    ClearIndicator: props => <Clear {...props} blue={blue} />,
    MultiValueRemove: props => <MultiValueRemove {...props} blue={blue} />,
  };
}

export function formatOptionLabel<T>(option: Option<T>): React.ReactNode {
  if (!option.icon && !option.details && !option.iconPath) {
    return option.label;
  }
  return React.createElement(
    "div",
    {},
    <span className={cx({ [css.withIconPath]: !!option.iconPath })}>
      {option.iconPath && <img src={option.iconPath} alt={option.label} />}
      {option.icon}
      <span>{option.label}</span>
      {option.details}
    </span>,
  );
}
