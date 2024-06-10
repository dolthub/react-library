import { useDelay } from "@dolthub/react-hooks";
import { FaRegClone } from "@react-icons/all-files/fa/FaRegClone";
import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import Btn from "../Btn";
import FieldWithButton, { CommonProps } from "../FieldWithButton";
import css from "./index.module.css";

export default function CopyableField(props: CommonProps) {
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
