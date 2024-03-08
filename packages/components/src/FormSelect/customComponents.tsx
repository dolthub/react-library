import { AiFillCaretDown } from "@react-icons/all-files/ai/AiFillCaretDown";
import cx from "classnames";
import React from "react";
import { GroupBase, SelectComponentsConfig } from "react-select";
import css from "./index.module.css";

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
