import { Maybe } from "@dolthub/web-utils";
import {
  GroupBase,
  OnChangeValue,
  OptionsOrGroups,
  PropsValue,
} from "react-select";
import { OnChange, Option, OptionTypeBase, Props } from "./types";

// Converts custom onChangeValue function to onChange function for react-select
export function getOnChange<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean,
>(
  onChangeValue: (e: Maybe<T>) => void,
): OnChange<T, OptionType, IsMulti> | undefined {
  return (e: OnChangeValue<OptionType, IsMulti>) => {
    if (!e) {
      onChangeValue(null);
      return;
    }
    onChangeValue((e as OptionType).value);
  };
}

// Searches options array for OptionType that matches val. If provided, uses
// `getValFunc` for matching. The default matching function checks for val ===
// option.value
export function getValueForOptions<T, OptionType extends OptionTypeBase<T>>(
  val: Maybe<T>,
  options: OptionType[],
  getValFunc?: (o: T, v: T) => boolean,
): OptionType | null {
  const equal = (o: T, v: T): boolean => {
    if (getValFunc) {
      return getValFunc(o, v);
    }
    return o === v;
  };

  return val !== undefined && val !== null
    ? options[options.findIndex(x => equal(x.value, val))]
    : null;
}

// Given a value that is currently selected and a list of all options,
// move the selected option (determined by value) to the top of the list.
export function moveSelectedToTop<T, OptionType extends Option<T>>(
  selectedVal: Maybe<T>,
  options?: OptionType[],
): OptionType[] {
  if (!selectedVal || !options) {
    return options ?? [];
  }

  return [...options].sort(a => {
    if (a.value === selectedVal) {
      return -1;
    }
    return 0;
  });
}

// Given a value that is currently selected and a list of all options,
// move the selected option (determined by value) to the top of the list.
export function moveSelectedToTopForGroup<
  T,
  OptionType extends OptionTypeBase<T>,
>(
  selectedVal: PropsValue<OptionType> | undefined,
  options?: OptionsOrGroups<OptionType, GroupBase<OptionType>> | undefined,
): OptionsOrGroups<OptionType, GroupBase<OptionType>> | undefined {
  if (!selectedVal || !options) {
    return options ?? [];
  }

  return options.map(o => {
    if ("options" in o) {
      return {
        ...o,
        options: [...o.options].sort(a => {
          if (Array.isArray(selectedVal)) {
            if (selectedVal.some(v => a.value === v.value)) {
              return -1;
            }
          }
          if ("value" in selectedVal && a.value === selectedVal.value) {
            return -1;
          }

          return 0;
        }),
      };
    }
    return o;
  });
}

export function getValue<T>(
  props: Props<T, Option<T>, false>,
  options: OptionsOrGroups<Option<T>, GroupBase<Option<T>>> & Array<Option<T>>,
): PropsValue<Option<T>> | undefined {
  const valueFromOptions = getValueForOptions<T, Option<T>>(
    props.val,
    options,
    props.getValFunc,
  );

  if (props.useValueAsSingleValue && props.val) {
    return { value: props.val, label: String(props.val) };
  }

  return valueFromOptions;
}
