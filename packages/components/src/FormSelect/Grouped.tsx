import React from "react";
import Select from "react-select";
import Wrapper from "./Wrapper";
import { getComponentsForGroup } from "./components";
import { getCustomStyles } from "./styles";
import { GroupedProps, Option, OptionTypeBase } from "./types";
import { moveSelectedToTopForGroup } from "./utils";

export default function FormSelectGrouped<
  T,
  OptionType extends OptionTypeBase<T> = Option<T>,
  IsMulti extends boolean = false,
>({
  mono = false,
  light = false,
  small = false,
  pill = false,
  transparentBorder = false,
  blue = false,
  rounded = false,
  forMobile = false,
  selectedOptionFirst = false,
  ...props
}: GroupedProps<T, OptionType, IsMulti>): JSX.Element {
  const styles = getCustomStyles<T, OptionType, IsMulti>(
    mono,
    light,
    small,
    pill,
    transparentBorder,
    blue,
    rounded,
    forMobile,
  );

  const options =
    selectedOptionFirst && !props.hideSelectedOptions
      ? moveSelectedToTopForGroup(props.value, props.options)
      : props.options;

  return (
    <Wrapper {...props} small={small}>
      <Select
        {...props}
        options={options}
        styles={props.customStyles ? props.customStyles(styles) : styles}
        components={getComponentsForGroup({
          ...props,
          blue,
          light: forMobile && !light,
        })}
      />
    </Wrapper>
  );
}
