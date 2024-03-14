import { useEffectOnMount } from "@dolthub/react-hooks";
import React, { useCallback, useState } from "react";
import Select from "react-select";
import Wrapper from "./Wrapper";
import { getComponentsForGroup } from "./components";
import { getCustomStyles } from "./styles";
import { GroupedProps, Option, OptionTypeBase } from "./types";
import { moveSelectedToTopForGroup } from "./utils";

export default function FormSelectGrouped<
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
  selectedOptionFirst = false,
  ...props
}: GroupedProps<T, OptionType, IsMulti>): JSX.Element {
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);

  const styles = getCustomStyles<T, OptionType, IsMulti>(
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
      ? moveSelectedToTopForGroup(props.value, props.options)
      : props.options;

  const findTabIndexForValue = useCallback((): number => {
    if (!options || !props.value) return 0;
    return options.findIndex(o => {
      if ("value" in o) {
        return o.value === props.value;
      }
      if ("options" in o) {
        return o.options.some(oo => {
          if (props.value) {
            if ("value" in props.value) {
              return oo.value === props.value.value;
            }
            if (Array.isArray(props.value)) {
              return props.value.some(v => {
                if ("value" in v) {
                  return oo.value === v.value;
                }
                return false;
              });
            }
          }

          return false;
        });
      }
      return false;
    });
  }, [options, props.value]);

  useEffectOnMount(() => {
    const activeTabIdx = findTabIndexForValue();
    if (activeTabIdx < 0) return;
    setSelectedGroupIndex(activeTabIdx);
  });

  return (
    <Wrapper {...props} small={small}>
      <Select
        {...props}
        options={options}
        styles={props.customStyles ? props.customStyles(styles) : styles}
        components={getComponentsForGroup({
          ...props,
          selectedGroupIndex,
          setSelectedGroupIndex,
          blue,
          light: forMobile && !light,
        })}
      />
    </Wrapper>
  );
}
