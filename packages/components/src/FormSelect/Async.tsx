import React from "react";
import AsyncSelect from "react-select/async";
import Wrapper from "./Wrapper";
import { getComponents } from "./components";
import { getCustomStyles } from "./styles";
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

  return (
    <Wrapper {...props} small={small}>
      <AsyncSelect
        {...props}
        styles={props.customStyles ? props.customStyles(styles) : styles}
        components={getComponents({
          ...props,
          blue,
          light: forMobile && !light,
        })}
      />
    </Wrapper>
  );
}
