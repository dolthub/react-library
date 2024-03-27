import cx from "classnames";
import "github-markdown-css/github-markdown-light.css";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import css from "./index.module.css";

type Props = {
  className?: string;
  value: string;
  ["data-cy"]?: string;
  hasMaxHeight?: boolean;
  baseTextSize?: boolean;
  spaceAbove?: boolean;
};

export default function Markdown({
  hasMaxHeight = false,
  baseTextSize = false,
  spaceAbove = false,
  ...props
}: Props) {
  return (
    <div
      data-cy={props["data-cy"]}
      aria-label="markdown"
      dir="auto"
      className={cx({ [css.spaceAbove]: spaceAbove })}
    >
      <ReactMarkdown
        className={cx(
          "markdown-body",
          css.preview,
          {
            [css.previewMaxHeight]: hasMaxHeight,
            [css.previewBaseText]: baseTextSize,
          },
          props.className,
        )}
        remarkPlugins={[remarkGfm]}
      >
        {props.value}
      </ReactMarkdown>
    </div>
  );
}
