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

type Components<Option, IsMulti extends boolean> =
  | Partial<SelectComponentsConfig<Option, IsMulti, GroupBase<Option>>>
  | undefined;

export function getComponents<Option, IsMulti extends boolean>(
  components?: Components<Option, IsMulti>,
  blue?: boolean,
): Components<Option, IsMulti> {
  return {
    ...components,
    IndicatorSeparator: () => null,
    DropdownIndicator: () => <Dropdown blue={blue} />,
  };
}
