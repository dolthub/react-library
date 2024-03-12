import { AiFillCaretDown } from "@react-icons/all-files/ai/AiFillCaretDown";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import cx from "classnames";
import React from "react";
import {
  ClearIndicatorProps,
  DropdownIndicatorProps,
  GroupBase,
  MultiValueRemoveProps,
  SelectComponentsConfig,
} from "react-select";
import css from "./index.module.css";
import { Option, OptionTypeBase } from "./types";

function Dropdown<OptionType extends OptionTypeBase, IsMulti extends boolean>(
  props: DropdownIndicatorProps<OptionType, IsMulti> & {
    blue?: boolean;
    light?: boolean;
  },
) {
  return (
    <div {...props.innerProps}>
      <AiFillCaretDown
        className={cx(css.dropdownIndicator, {
          [css.blueIndicator]: !!props.blue,
          [css.whiteIndicator]: !!props.light,
        })}
      />
    </div>
  );
}

function Clear<OptionType extends OptionTypeBase, IsMulti extends boolean>(
  props: ClearIndicatorProps<OptionType, IsMulti> & { blue?: boolean },
) {
  return (
    <div {...props.innerProps}>
      <AiOutlineClose
        className={cx(css.clearIndicator, {
          [css.blueIndicator]: !!props.blue,
        })}
      />
    </div>
  );
}

function MultiValueRemove<
  OptionType extends OptionTypeBase,
  IsMulti extends boolean,
>(props: MultiValueRemoveProps<OptionType, IsMulti> & { blue?: boolean }) {
  return (
    <div
      {...props.innerProps}
      className={cx(css.multiValueRemove, {
        [css.blueIndicator]: !!props.blue,
      })}
    >
      <AiOutlineClose />
    </div>
  );
}

type Components<Option, IsMulti extends boolean> =
  | Partial<SelectComponentsConfig<Option, IsMulti, GroupBase<Option>>>
  | undefined;

export function getComponents<
  OptionType extends OptionTypeBase,
  IsMulti extends boolean,
>(
  components?: Components<OptionType, IsMulti>,
  blue?: boolean,
  light?: boolean,
): Components<OptionType, IsMulti> {
  return {
    ...components,
    IndicatorSeparator: () => null,
    DropdownIndicator: props => (
      <Dropdown {...props} blue={blue} light={light} />
    ),
    ClearIndicator: props => <Clear {...props} blue={blue} />,
    MultiValueRemove: props => <MultiValueRemove {...props} blue={blue} />,
  };
}

export function formatOptionLabel(option: Option): React.ReactNode {
  if (!option.icon && !option.details && !option.iconPath) {
    return option.label;
  }
  return React.createElement(
    "div",
    {},
    <span className={cx({ [css.withIconPath]: !!option.iconPath })}>
      {option.iconPath && <img src={option.iconPath} alt={option.label} />}
      {option.icon}
      <span>{option.label}</span>
      {option.details}
    </span>,
  );
}
