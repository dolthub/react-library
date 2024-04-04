import { useDelay } from "@dolthub/react-hooks";
import { FaRegClone } from "@react-icons/all-files/fa/FaRegClone";
import cx from "classnames";
import React, { ReactNode } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import Btn from "../Btn";
import css from "./index.module.css";

type Props = {
  label?: string;
  value: string;
  hideValue?: boolean;
  children?: ReactNode;
  blue?: boolean;
  help?: ReactNode;
  blur?: boolean;
  labelClassName?: string;
  className?: string;
  smallValue?: boolean;
  vertical?: boolean;
  valueForHidden?: string;
};

export default function CopyableField(props: Props) {
  const copySuccess = useDelay();
  return (
    <div
      className={cx(
        css.field,
        { [css.verticalField]: !!props.vertical },
        props.className,
      )}
      data-cy={`copyable-field-${
        props.label ? props.label.toLowerCase() : "item"
      }`}
    >
      <div className={cx(css.label, props.labelClassName)}>
        {props.label}
        {props.label ? ":" : ""}
      </div>
      <div className={css.valueWrapper}>
        {props.hideValue || !props.value ? (
          props.valueForHidden ?? ""
        ) : (
          <div className={css.valContainer}>
            {props.help}
            <div
              className={cx(css.value, {
                [css.blueValue]: !!props.blue,
                [css.smallValue]: !!props.smallValue,
              })}
            >
              <span
                className={cx({
                  [css.blurValue]: !!props.blur && !copySuccess.active,
                })}
              >
                {copySuccess.active ? "Copied to clipboard" : props.value}
              </span>
              {typeof props.value === "string" && (
                <CopyToClipboard text={props.value} onCopy={copySuccess.start}>
                  <Btn className={css.clipboard} aria-label="copy value">
                    <FaRegClone />
                  </Btn>
                </CopyToClipboard>
              )}
            </div>
          </div>
        )}
        {(!props.hideValue || props.valueForHidden) && props.children}
      </div>
    </div>
  );
}
