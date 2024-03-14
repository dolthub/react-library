import React from "react";
import { NoticeProps, components } from "react-select";
import { CustomGroupBase, OptionTypeBase } from "../types";

export default function NoOptionsMessage<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean,
>(
  props: NoticeProps<OptionType, IsMulti, CustomGroupBase<OptionType>> & {
    noOptionsMsg?: string;
  },
) {
  return (
    <components.NoOptionsMessage {...props}>
      {props.noOptionsMsg ?? "No options"}
    </components.NoOptionsMessage>
  );
}
