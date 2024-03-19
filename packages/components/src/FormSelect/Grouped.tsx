import React, { useEffect, useState } from "react";
import Select from "react-select";
import Wrapper from "./Wrapper";
import { getComponentsForGroup } from "./components";
import { getCustomStyles } from "./styles";
import { GroupedProps, Option, OptionTypeBase } from "./types";
import { findTabIndexForValue, moveSelectedToTopForGroup } from "./utils";

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
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);

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

  useEffect(() => {
    if (props.isLoading) return;
    const activeTabIdx = findTabIndexForValue(options, props.value);
    if (activeTabIdx < 0) return;
    setSelectedGroupIndex(activeTabIdx);
  }, [props.value, props.isLoading]);

  return (
    <Wrapper {...props} small={small}>
      <Select
        {...props}
        options={options}
        styles={props.customStyles ? props.customStyles(styles) : styles}
        components={getComponentsForGroup({
          ...props,
          selectedGroupIndex,
          setSelectedGroupIndex,
          blue,
          light: forMobile && !light,
        })}
      />
    </Wrapper>
  );
}
