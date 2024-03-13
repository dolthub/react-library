import React from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import Wrapper from "./Wrapper";
import { formatOptionLabel, getComponents } from "./customComponents";
import customStyles, { mobileStyles } from "./styles";
import { AsyncProps, Option, OptionTypeBase, Props } from "./types";
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
  selectedOptionFirst: selectedFirst = false,
  pill = false,
  transparentBorder = false,
  blue = false,
  rounded = false,
  forMobile = false,
  ...props
}: Props<T, Option<T>>): JSX.Element {
  const styles = forMobile
    ? mobileStyles<T, Option<T>>(light)
    : customStyles<T, Option<T>, false>(
        mono,
        light,
        small,
        pill,
        transparentBorder,
        blue,
        rounded,
      );

  const options =
    selectedFirst && !props.hideSelectedOptions
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
        components={getComponents(props.components, blue, forMobile && !light)}
        formatOptionLabel={formatOptionLabel}
      />
    </Wrapper>
  );
}

function FormSelectAsync<
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

FormSelect.Async = FormSelectAsync;

export default FormSelect;
