import { KeyCodes } from "@dolthub/web-utils";
import cx from "classnames";
import React from "react";
import CharCount from "../CharCount";
import TextareaWithMarkdown from "../TextareaWithMarkdown";
import css from "./index.module.css";
import { CommonProps } from "./types";

type Props = CommonProps & {
  separateTabs?: boolean;
};

export default function InnerCommentForm(props: Props) {
  const onKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const enterKey = e.keyCode === KeyCodes.ENTER;
    if (enterKey && (e.ctrlKey || e.metaKey)) {
      await props.onSubmit(e);
    }
  };

  return (
    <div className={css.form}>
      <form onSubmit={props.onSubmit} data-cy={props["data-cy"]}>
        <div className={css.formLeft}>
          {props.profPic && (
            <div className={css.imgMarginWrapper}>{props.profPic}</div>
          )}
          <div
            className={cx(css.textarea, {
              [css.textareaWithImage]: !!props.profPic,
            })}
          >
            {props.maxCharCount && (
              <CharCount
                maxChar={props.maxCharCount}
                desc={props.comment}
                className={cx(css.charCount, {
                  [css.charCountWithLabel]: !!props.label,
                })}
              />
            )}
            <TextareaWithMarkdown
              value={props.comment}
              rows={4}
              placeholder={props.placeholder ?? "Leave a comment"}
              onChange={props.setComment}
              inputref={props.inputRef}
              onKeyDown={onKeyDown}
              data-cy="comment-textarea-content"
              unroundBottom={props.unroundBottom}
              separateTabs={props.separateTabs}
              hasMinHeight={props.hasMinHeight}
              label={props.label}
            />
            {props.children}
          </div>
        </div>
      </form>
    </div>
  );
}
