import { KeyCodes } from "@dolthub/web-utils";
import React, { ReactNode, SyntheticEvent } from "react";
import TextareaWithMarkdown from "../TextareaWithMarkdown";
import css from "./index.module.css";

type Props = {
  children?: ReactNode;
  ["data-cy"]?: string;
  onSubmit: (e: SyntheticEvent) => Promise<void>;
  profPic?: ReactNode;
  comment: string;
  setComment: (c: string) => void;
  inputRef: React.RefObject<HTMLTextAreaElement> | undefined;
};

export default function CommentForm(props: Props) {
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
          <div className={css.textarea}>
            <TextareaWithMarkdown
              value={props.comment}
              rows={4}
              placeholder="Leave a comment"
              onChange={props.setComment}
              inputref={props.inputRef}
              onKeyDown={onKeyDown}
              data-cy="comment-textarea-content"
              unroundBottom
            />
            {props.children}
          </div>
        </div>
      </form>
    </div>
  );
}
