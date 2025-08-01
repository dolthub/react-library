import React, { ReactNode } from "react";
import { SingleValueProps, components } from "react-select";
import { Option } from "../types";
import CustomOption from "./CustomOption";

export default function SingleValueComponent<
  T,
  OptionType extends Option<T>,
  IsMulti extends boolean,
>(props: SingleValueProps<OptionType, IsMulti>): ReactNode {
  return (
    <components.SingleValue {...props}>
      <CustomOption data={props.data} labelPrefix="single-value" />
    </components.SingleValue>
  );
}
