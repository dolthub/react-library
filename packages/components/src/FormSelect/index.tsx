import React from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import Wrapper from "./Wrapper";
import { formatOptionLabel, getComponents } from "./customComponents";
import customStyles from "./styles";
import { AsyncProps, Option, Props } from "./types";
import { getOnChange, getValue, moveSelectedToTop } from "./utils";

/*
This custom FormSelect component is simplified to accept values/onChange arguments that represent the `value` field on an `OptionType`.

For example, instead of using the full OptionType as a value (i.e. value={ value: "Taylor", label: "Name" }) we can just use the string "Taylor" and the `getValueForOptions` finds the matching `OptionType` within the provided `options`. A custom `getValueForOptions` function can be provided using the `getValFunc` prop.

It has also been adjusted to accept values other than strings, like numbers, enums, etc.
*/
const FormSelect = ({
  mono = false,
  light = false,
  small = false,
  selectedOptionFirst: selectedFirst = false,
  pill = false,
  transparentBorder = false,
  blue = false,
  ...props
}: Props<Option>): JSX.Element => {
  const styles = customStyles<Option>(
    mono,
    light,
    small,
    pill,
    transparentBorder,
    blue,
  );

  const options =
    selectedFirst && !props.hideSelectedOptions
      ? moveSelectedToTop(props.val, props.options)
      : props.options;

  return (
    <Wrapper {...props}>
      <Select
        {...props}
        options={options}
        onChange={getOnChange<Option>(props.onChangeValue)}
        value={getValue(props, options)}
        styles={props.customStyles ? props.customStyles(styles) : styles}
        components={getComponents(props.components, blue)}
        formatOptionLabel={formatOptionLabel}
      />
    </Wrapper>
  );
};

const FormSelectAsync = ({
  mono = false,
  light = false,
  small = false,
  // selectedOptionFirst: selectedFirst = false,
  pill = false,
  transparentBorder = false,
  blue = false,
  ...props
}: AsyncProps<Option>): JSX.Element => {
  const styles = customStyles<Option>(
    mono,
    light,
    small,
    pill,
    transparentBorder,
    blue,
  );

  // const options =
  //   selectedFirst && !props.hideSelectedOptions
  //     ? moveSelectedToTop(props.val, props.options)
  //     : props.options;

  return (
    <Wrapper {...props}>
      <AsyncSelect
        {...props}
        // loadOptions={props.loadOptions}
        // options={options}
        // onChange={getOnChange<Option>(props.onChangeValue)}
        // value={getValue(props, options)}
        styles={props.customStyles ? props.customStyles(styles) : styles}
        components={getComponents(props.components, blue)}
        formatOptionLabel={formatOptionLabel}
      />
    </Wrapper>
  );
};

FormSelect.Async = FormSelectAsync;

export * from "./types";
export default FormSelect;
