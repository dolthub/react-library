import { ReactNode, SyntheticEvent } from "react";

export type CommonProps = {
  children?: ReactNode;
  ["data-cy"]?: string;
  onSubmit: (e: SyntheticEvent) => Promise<void>;
  profPic?: ReactNode;
  comment: string;
  setComment: (c: string) => void;
  inputRef?: React.RefObject<HTMLTextAreaElement | null>;
  hasMinHeight?: boolean;
  unroundBottom?: boolean;
  placeholder?: string;
  label?: string;
  maxCharCount?: number;
};
