import React from "react";
import { NoticeProps, OptionsOrGroups, components } from "react-select";
import { CustomGroupBase, OptionTypeBase } from "../types";

export default function NoOptionsMessage<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean,
>(
  props: NoticeProps<OptionType, IsMulti, CustomGroupBase<OptionType>> & {
    noOptionsMsg?: string;
    selectedGroupIndex?: number;
  },
) {
  return (
    <components.NoOptionsMessage {...props}>
      {getNoOptionsMessage(
        props.options,
        props.noOptionsMsg,
        props.selectedGroupIndex,
      )}
    </components.NoOptionsMessage>
  );
}

function getNoOptionsMessage<T, OptionType extends OptionTypeBase<T>>(
  options: OptionsOrGroups<OptionType, CustomGroupBase<OptionType>>,
  noOptsMsg?: string,
  selectedGroupIndex?: number,
): string {
  if (noOptsMsg) {
    return noOptsMsg;
  }

  if (selectedGroupIndex !== undefined) {
    const activeGroup = options[selectedGroupIndex];
    if ("noOptionsMsg" in activeGroup && activeGroup.noOptionsMsg) {
      return activeGroup.noOptionsMsg;
    }
  }

  return "No options";
}
