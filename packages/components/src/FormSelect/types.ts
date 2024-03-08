import { ReactNode } from "react";
import {
  ActionMeta,
  OnChangeValue,
  Props as SelectProps,
  StylesConfig,
} from "react-select";

export interface OptionTypeBase {
  label: string;
  value: any;
}

export interface Option extends OptionTypeBase {
  isDisabled?: boolean;
  details?: ReactNode;
  icon?: ReactNode;
}

// Options rendered with details will not render an input; selection can only be made from dropdown.
// export interface OptionWithDetails extends Option {
//   details?: ReactNode;
//   icon?: ReactNode;
// }

export type OnChange<OptionType> = (
  value: OnChangeValue<OptionType, false>,
  action: ActionMeta<OptionType>,
) => void;

export type CustomStyles<OptionType, IsMulti extends boolean> = (
  s: Partial<StylesConfig<OptionType, IsMulti>>,
) => Partial<StylesConfig<OptionType, IsMulti>>;

export type WrapperProps = {
  label?: string;
  outerClassName?: string;
  labelClassName?: string;
  horizontal?: boolean;
  ["data-cy"]?: string;
};

type CustomProps<OptionType extends OptionTypeBase, IsMulti extends boolean> = {
  options: OptionType[];
  val: any | null;
  mono?: boolean;
  light?: boolean;
  small?: boolean;
  pill?: boolean;
  blue?: boolean;
  transparentBorder?: boolean;
  // Show the selected option first in the list
  selectedOptionFirst?: boolean;
  useValueAsSingleValue?: boolean;
  // onChangeValue handles updating the `val` prop (type any).
  // onChange can be used to update `value` (type OptionType).
  onChangeValue: (val: any) => void;
  // Handles getting value if value is not a string
  getValFunc?: (o: any, v: any) => boolean;
  customStyles?: CustomStyles<OptionType, IsMulti>;
} & WrapperProps;

export type Props<
  OptionType extends OptionTypeBase,
  IsMulti extends boolean = false,
> = SelectProps<OptionType, IsMulti> & CustomProps<OptionType, IsMulti>;
