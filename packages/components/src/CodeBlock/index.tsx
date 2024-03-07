import { useDelay } from "@dolthub/react-hooks";
import { FaRegClone } from "@react-icons/all-files/fa/FaRegClone";
import cx from "classnames";
import React, { ReactNode } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import Btn from "../Btn";
import css from "./index.module.css";

type Props = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

const CodeBlock = ({ children, className, disabled = false }: Props) => (
  <div className={cx(css.code, { [css.disabled]: disabled }, className)}>
    {children}
  </div>
);

type CopyProps = {
  textToCopy: string;
  children?: ReactNode;
  className?: string;
  ["data-cy"]?: string;
  disabled?: boolean;
  small?: boolean;
};

const WithCopyButton = (props: CopyProps) => {
  const copySuccess = useDelay();
  return (
    <CodeBlock
      disabled={props.disabled}
      className={cx(
        css.withCopy,
        { [css.smallCopy]: props.small },
        props.className,
      )}
    >
      <div data-cy={props["data-cy"]}>
        <pre>
          <code>
            {copySuccess.active
              ? "Copied to clipboard"
              : props.children ?? props.textToCopy}
          </code>
        </pre>
        {!props.disabled && (
          <CopyToClipboard text={props.textToCopy} onCopy={copySuccess.start}>
            <Btn className={css.clipboard}>
              <FaRegClone />
            </Btn>
          </CopyToClipboard>
        )}
      </div>
    </CodeBlock>
  );
};

CodeBlock.WithCopyButton = WithCopyButton;

export default CodeBlock;
