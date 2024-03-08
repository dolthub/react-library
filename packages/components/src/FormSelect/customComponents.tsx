import { AiFillCaretDown } from "@react-icons/all-files/ai/AiFillCaretDown";
import cx from "classnames";
import React from "react";
import { GroupBase, SelectComponentsConfig } from "react-select";
import css from "./index.module.css";
import { Option } from "./types";

export function Dropdown(props: { blue?: boolean }) {
  return (
    <AiFillCaretDown
      className={cx(css.dropdownIndicator, {
        [css.blueIndicator]: !!props.blue,
      })}
    />
  );
}

type Components<Option> =
  | Partial<SelectComponentsConfig<Option, false, GroupBase<Option>>>
  | undefined;

export function getComponents<Option>(
  components?: Components<Option>,
  blue?: boolean,
): Components<Option> {
  return {
    ...components,
    IndicatorSeparator: () => null,
    DropdownIndicator: () => <Dropdown blue={blue} />,
  };
}

export function formatOptionLabel(option: Option): React.ReactNode {
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
