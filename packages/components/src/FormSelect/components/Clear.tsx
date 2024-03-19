import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import cx from "classnames";
import React from "react";
import { ClearIndicatorProps } from "react-select";
import { OptionTypeBase } from "../types";
import css from "./index.module.css";

export default function Clear<
  T,
  OptionType extends OptionTypeBase<T>,
  IsMulti extends boolean,
>(props: ClearIndicatorProps<OptionType, IsMulti> & { blue?: boolean }) {
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
