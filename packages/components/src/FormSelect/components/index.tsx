import React from "react";
import { GroupBase, SelectComponentsConfig } from "react-select";
import { CustomGroupedProps, OptionTypeBase } from "../types";
import Clear from "./Clear";
import Dropdown from "./Dropdown";
import Group from "./Group";
import Menu from "./Menu";
import MenuList from "./MenuList";
import MultiValueRemove from "./MultiValueRemove";
import NoOptionsMessage from "./NoOptionsMessage";
import OptionComponent, { OptionForGroup } from "./Option";
import SingleValueComponent from "./SingleValue";

type Components<Option, IsMulti extends boolean> =
  | Partial<SelectComponentsConfig<Option, IsMulti, GroupBase<Option>>>
  | undefined;

type ComponentArgs<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean,
> = {
  components?: Components<OptionType, IsMulti>;
  blue?: boolean;
  light?: boolean;
  noOptionsMsg?: string;
  selectedGroupIndex?: number;
};

type ComponentGroupArgs<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean,
> = ComponentArgs<T, OptionType, IsMulti> & CustomGroupedProps;

export function getComponents<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean,
>({
  blue,
  light,
  ...args
}: ComponentArgs<T, OptionType, IsMulti>): Components<OptionType, IsMulti> {
  return {
    ...args.components,
    IndicatorSeparator: () => null,
    DropdownIndicator: props => (
      <Dropdown {...props} blue={blue} light={light} />
    ),
    ClearIndicator: props => <Clear {...props} blue={blue} />,
    MultiValueRemove: props => <MultiValueRemove {...props} blue={blue} />,
    Option: props => <OptionComponent {...props} />,
    SingleValue: props => <SingleValueComponent {...props} />,
    NoOptionsMessage: props => (
      <NoOptionsMessage
        {...props}
        noOptionsMsg={args.noOptionsMsg}
        selectedGroupIndex={args.selectedGroupIndex}
      />
    ),
  };
}

export function getComponentsForGroup<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean,
>({
  selectedGroupIndex,
  setSelectedGroupIndex,
  ...args
}: ComponentGroupArgs<T, OptionType, IsMulti>): Components<
  OptionType,
  IsMulti
> {
  return {
    ...getComponents({ ...args, selectedGroupIndex }),
    Menu: props => (
      <Menu
        {...props}
        selectedGroupIndex={selectedGroupIndex}
        setSelectedGroupIndex={setSelectedGroupIndex}
      />
    ),
    MenuList: props => (
      <MenuList
        {...props}
        selectedGroupIndex={selectedGroupIndex}
        setSelectedGroupIndex={setSelectedGroupIndex}
      />
    ),
    Group: props => <Group {...props} />,
    Option: props => <OptionForGroup {...props} />,
  };
}
