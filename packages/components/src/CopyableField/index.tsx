import { useDelay } from "@dolthub/react-hooks";
import { FaRegClone } from "@react-icons/all-files/fa/FaRegClone";
import React, { ReactNode } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import Btn from "../Btn";
import FieldWithButton from "../FieldWithButton";
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
    <FieldWithButton
      {...props}
      buttonActive={copySuccess.active}
      button={
        typeof props.value === "string" ? (
          <CopyToClipboard text={props.value} onCopy={copySuccess.start}>
            <Btn className={css.clipboard} aria-label="copy value">
              <FaRegClone />
            </Btn>
          </CopyToClipboard>
        ) : undefined
      }
    />
  );
}
