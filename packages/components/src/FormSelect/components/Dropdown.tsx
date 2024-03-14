import { AiFillCaretDown } from "@react-icons/all-files/ai/AiFillCaretDown";
import cx from "classnames";
import React from "react";
import { DropdownIndicatorProps } from "react-select";
import { OptionTypeBase } from "../types";
import css from "./index.module.css";

export default function Dropdown<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean,
>(
  props: DropdownIndicatorProps<OptionType, IsMulti> & {
    blue?: boolean;
    light?: boolean;
  },
) {
  return (
    <div {...props.innerProps}>
      <AiFillCaretDown
        className={cx(css.dropdownIndicator, {
          [css.blueIndicator]: !!props.blue,
          [css.whiteIndicator]: !!props.light,
        })}
      />
    </div>
  );
}
