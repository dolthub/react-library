import React from "react";
import { GroupBase, GroupProps } from "react-select";
import { OptionTypeBase } from "../types";

export default function Group<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean,
>({ children }: GroupProps<OptionType, IsMulti, GroupBase<OptionType>>) {
  return <div>{children}</div>;
}
