import { Maybe } from "@dolthub/web-utils";
import { ReactNode } from "react";
import {
  ActionMeta,
  GroupBase,
  OnChangeValue,
  Props as SelectProps,
  StylesConfig,
} from "react-select";
import { AsyncProps as AsyncSelectProps } from "react-select/async";

export interface OptionTypeBase<T> {
  label: string;
  value: T;
}

export interface Option<T> extends OptionTypeBase<T> {
  isDisabled?: boolean;
  details?: ReactNode;
  icon?: ReactNode;
  iconPath?: string;
}

export interface CustomGroupBase<OptionType> extends GroupBase<OptionType> {
  footer?: ReactNode;
  noOptionsMsg?: string;
}

export type OnChange<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean,
> = (
  value: OnChangeValue<OptionType, IsMulti>,
  action: ActionMeta<OptionType>,
) => void;

export type PartialStylesConfig<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean,
> = Partial<StylesConfig<OptionType, IsMulti, GroupBase<OptionType>>>;

export type CustomStyles<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean,
> = (
  s: PartialStylesConfig<T, OptionType, IsMulti>,
) => PartialStylesConfig<T, OptionType, IsMulti>;

export type WrapperProps = {
  label?: string;
  outerClassName?: string;
  labelClassName?: string;
  horizontal?: boolean;
  small?: boolean;
  ["data-cy"]?: string;
};

type CommonProps<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean,
> = {
  mono?: boolean;
  light?: boolean;
  small?: boolean;
  pill?: boolean;
  blue?: boolean;
  transparentBorder?: boolean;
  rounded?: boolean;
  forMobile?: boolean;
  customStyles?: CustomStyles<T, OptionType, IsMulti>;
  // Show the selected option first in the list
  selectedOptionFirst?: boolean;
  noOptionsMsg?: string;
} & WrapperProps;

type CustomSelectProps<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean,
> = CommonProps<T, OptionType, IsMulti> & {
  val: Maybe<T>;
  options: OptionType[];
  useValueAsSingleValue?: boolean;
  // Handles getting value if value is not a string
  getValFunc?: (o: T, v: T) => boolean;
  // onChangeValue handles updating the `val` prop (type T).
  // onChange can be used to update `value` (type OptionType).
  onChangeValue: (val: Maybe<T>) => void;
};

export type Props<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean = false,
> = Omit<SelectProps<OptionType, IsMulti>, "styles"> &
  CustomSelectProps<T, OptionType, IsMulti>;

export type AsyncProps<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean = false,
> = AsyncSelectProps<OptionType, IsMulti, GroupBase<OptionType>> &
  CommonProps<T, OptionType, IsMulti>;

export type CustomGroupedProps = {
  selectedGroupIndex: number;
  setSelectedGroupIndex: (i: number) => void;
};

export type GroupedProps<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean = false,
> = SelectProps<OptionType, IsMulti, CustomGroupBase<OptionType>> &
  CommonProps<T, OptionType, IsMulti> &
  CustomGroupedProps;
