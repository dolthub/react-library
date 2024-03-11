import { ReactNode } from "react";
import {
  ActionMeta,
  GroupBase,
  OnChangeValue,
  Props as SelectProps,
  StylesConfig,
} from "react-select";
import { AsyncProps as AsyncSelectProps } from "react-select/async";

export interface OptionTypeBase {
  label: string;
  value: any;
}

export interface Option extends OptionTypeBase {
  isDisabled?: boolean;
  details?: ReactNode;
  icon?: ReactNode;
  iconPath?: string;
}

export type OnChange<OptionType> = (
  value: OnChangeValue<OptionType, false>,
  action: ActionMeta<OptionType>,
) => void;

export type CustomStyles<
  OptionType extends OptionTypeBase,
  IsMulti extends boolean,
> = (
  s: Partial<StylesConfig<OptionType, IsMulti>>,
) => Partial<StylesConfig<OptionType, IsMulti>>;

export type WrapperProps = {
  label?: string;
  outerClassName?: string;
  labelClassName?: string;
  horizontal?: boolean;
  small?: boolean;
  ["data-cy"]?: string;
};

type CommonProps<OptionType extends OptionTypeBase, IsMulti extends boolean> = {
  mono?: boolean;
  light?: boolean;
  small?: boolean;
  pill?: boolean;
  blue?: boolean;
  transparentBorder?: boolean;
  rounded?: boolean;
  forMobile?: boolean;
  customStyles?: CustomStyles<OptionType, IsMulti>;
} & WrapperProps;

type CustomSelectProps<
  OptionType extends OptionTypeBase,
  IsMulti extends boolean,
> = CommonProps<OptionType, IsMulti> & {
  val: any | null;
  options: OptionType[];
  // Show the selected option first in the list
  selectedOptionFirst?: boolean;
  useValueAsSingleValue?: boolean;
  // Handles getting value if value is not a string
  getValFunc?: (o: any, v: any) => boolean;
  // onChangeValue handles updating the `val` prop (type any).
  // onChange can be used to update `value` (type OptionType).
  onChangeValue: (val: any) => void;
};

export type Props<
  OptionType extends OptionTypeBase,
  IsMulti extends boolean = false,
> = Omit<SelectProps<OptionType, IsMulti>, "styles"> &
  CustomSelectProps<OptionType, IsMulti>;

export type AsyncProps<
  OptionType extends OptionTypeBase,
  IsMulti extends boolean = false,
> = Omit<
  AsyncSelectProps<OptionType, IsMulti, GroupBase<OptionType>>,
  "styles"
> &
  CommonProps<OptionType, IsMulti>;
