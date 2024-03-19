import React from "react";
import Select from "react-select";
import FormSelectAsync from "./Async";
import FormSelectGrouped from "./Grouped";
import Wrapper from "./Wrapper";
import { getComponents } from "./components";
import { getCustomStyles } from "./styles";
import { Option, Props } from "./types";
import { getOnChange, getValue, moveSelectedToTop } from "./utils";

/*
This custom FormSelect component is simplified to accept values/onChange arguments that represent the `value` field on an `OptionType`.

For example, instead of using the full OptionType as a value (i.e. value={ value: "Taylor", label: "Name" }) we can just use the string "Taylor" and the `getValueForOptions` finds the matching `OptionType` within the provided `options`. A custom `getValueForOptions` function can be provided using the `getValFunc` prop.

It has also been adjusted to accept values other than strings, like numbers, enums, etc.
*/

function FormSelect<T>({
  mono = false,
  light = false,
  small = false,
  selectedOptionFirst = false,
  pill = false,
  transparentBorder = false,
  blue = false,
  rounded = false,
  forMobile = false,
  ...props
}: Props<T, Option<T>>): JSX.Element {
  const styles = getCustomStyles<T, Option<T>, false>(
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
      ? moveSelectedToTop(props.val, props.options)
      : props.options;

  return (
    <Wrapper {...props} small={small}>
      <Select
        {...props}
        options={options}
        onChange={getOnChange(props.onChangeValue)}
        value={getValue(props, options)}
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

FormSelect.Async = FormSelectAsync;
FormSelect.Grouped = FormSelectGrouped;

export default FormSelect;
