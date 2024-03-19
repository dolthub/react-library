import React from "react";
import AsyncSelect from "react-select/async";
import Wrapper from "./Wrapper";
import { formatOptionLabel, getComponents } from "./components";
import customStyles, { mobileStyles } from "./styles";
import { AsyncProps, Option, OptionTypeBase } from "./types";

export default function FormSelectAsync<
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
  ...props
}: AsyncProps<T, OptionType, IsMulti>): JSX.Element {
  const styles = forMobile
    ? mobileStyles<T, OptionType, IsMulti>(light)
    : customStyles<T, OptionType, IsMulti>(
        mono,
        light,
        small,
        pill,
        transparentBorder,
        blue,
        rounded,
      );

  return (
    <Wrapper {...props} small={small}>
      <AsyncSelect
        {...props}
        styles={props.customStyles ? props.customStyles(styles) : styles}
        components={getComponents(props.components, blue, forMobile && !light)}
        formatOptionLabel={formatOptionLabel}
      />
    </Wrapper>
  );
}
