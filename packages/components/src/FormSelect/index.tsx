import cx from "classnames";
import React, { ReactNode } from "react";
import Select from "react-select";
import { getComponents } from "./customComponents";
import css from "./index.module.css";
import customStyles from "./styles";
import { Option, OptionWithDetails, Props, WrapperProps } from "./types";
import {
  getOnChange,
  getValue,
  getValueForOptions,
  moveSelectedToTop,
} from "./utils";

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
      />
    </Wrapper>
  );
};

function WithDetails({
  mono = false,
  light = false,
  small = false,
  selectedOptionFirst: selectedFirst = false,
  ...props
}: Props<OptionWithDetails>) {
  const styles = customStyles<OptionWithDetails>(mono, light, small);
  const options =
    selectedFirst && !props.hideSelectedOptions
      ? moveSelectedToTop(props.val, props.options)
      : props.options;

  return (
    <Wrapper {...props}>
      <Select
        {...props}
        options={options}
        onChange={getOnChange<OptionWithDetails>(props.onChangeValue)}
        value={getValueForOptions<OptionWithDetails>(
          props.val,
          options,
          props.getValFunc,
        )}
        styles={{ ...styles, input: styles.input }}
        formatOptionLabel={formatOptionLabel}
        components={getComponents(props.components)}
      />
    </Wrapper>
  );
}

FormSelect.WithDetails = WithDetails;

function formatOptionLabel(
  option: OptionWithDetails,
): React.DetailedReactHTMLElement<Record<string, unknown>, HTMLElement> {
  return React.createElement(
    "div",
    {},
    <span>
      {option.icon}
      <span>{option.label}</span>
      {option.details}
    </span>,
  );
}

function Wrapper({
  horizontal = false,
  ...props
}: WrapperProps & { children: ReactNode }) {
  return (
    <div
      className={cx(props.outerClassName, {
        [css.horizontal]: horizontal,
      })}
      data-cy={props["data-cy"]}
    >
      {props.label && (
        <div
          className={cx(
            css.label,
            { [css.horizontalLabel]: horizontal },
            props.labelClassName,
          )}
        >
          {props.label}
        </div>
      )}
      {props.children}
    </div>
  );
}

export * from "./types";
export default FormSelect;
