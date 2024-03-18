import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import cx from "classnames";
import React from "react";
import { MultiValueRemoveProps } from "react-select";
import { OptionTypeBase } from "../types";
import css from "./index.module.css";

export default function MultiValueRemove<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean,
>(props: MultiValueRemoveProps<OptionType, IsMulti> & { blue?: boolean }) {
  return (
    <div
      {...props.innerProps}
      className={cx(css.multiValueRemove, {
        [css.blueIndicator]: !!props.blue,
      })}
      aria-label={`remove ${props.data.label}`}
    >
      <AiOutlineClose />
    </div>
  );
}
