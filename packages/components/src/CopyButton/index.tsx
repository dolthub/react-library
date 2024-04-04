import { useDelay } from "@dolthub/react-hooks";
import { IoCopyOutline } from "@react-icons/all-files/io5/IoCopyOutline";
import cx from "classnames";
import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import Button from "../Button";
import css from "./index.module.css";

type Props = {
  text: string;
  light?: boolean;
};

export default function CopyButton({ text, light }: Props) {
  const success = useDelay(3000);
  return (
    <CopyToClipboard text={text} onCopy={success.start}>
      <Button className={cx(css.copy, { [css.light]: light })}>
        {light && <IoCopyOutline />}
        {success.active ? "Copied" : "Copy"}
      </Button>
    </CopyToClipboard>
  );
}
