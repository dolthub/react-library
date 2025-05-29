import {
  useContextWithError,
  useEffectOnMount,
  useFocus,
  useStateWithSessionStorage,
} from "@dolthub/react-hooks";
import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createCustomContext } from "./createCustomContext";

// This context handles the comment box on the pull details and issue details page
export type CommentFormContextType = {
  getFormPositionOnPage: () => void;
  commentFormRef: React.RefObject<HTMLDivElement | null>;
  commentFormIsVisible: boolean;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  loading: boolean;
  comment: string;
  setComment: (c: string) => void;
  onSubmit: (e: SyntheticEvent) => Promise<void>;
  error?: Error;
};

export const CommentFormContext =
  createCustomContext<CommentFormContextType>("CommentFormContext");

type Props = {
  children: React.ReactNode;
  containerId: string;
  commentId: string;
  createComment: (comment: string) => Promise<boolean>;
  loading: boolean;
  error?: Error;
};

export default function CommentFormProvider(props: Props): React.JSX.Element {
  const [comment, setComment] = useStateWithSessionStorage(
    `comment-${props.commentId}`,
  );
  const { setRefocus } = useFocus(props.containerId);
  const commentFormRef = useRef<HTMLDivElement>(null);
  const initialHeight = typeof window === "undefined" ? 0 : window.innerHeight;
  const [windowHeight, setWindowHeight] = useState(initialHeight);
  const [formIsVisible, setFormIsVisible] = useState(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const getFormPositionOnPage = useCallback(() => {
    if (commentFormRef.current) {
      const { top } = commentFormRef.current.getBoundingClientRect();
      setFormIsVisible(top <= windowHeight);
    }
  }, [commentFormRef, windowHeight]);

  useEffect(() => {
    if (formIsVisible) {
      inputRef.current?.focus();
    } else {
      setRefocus(true);
    }
  }, [formIsVisible, inputRef, setRefocus]);

  useEffectOnMount(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    getFormPositionOnPage();
  }, [windowHeight, getFormPositionOnPage, props.loading]);

  const onSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      const success = await props.createComment(comment);
      if (!success) return;
      setComment("");
      commentFormRef.current?.scrollIntoView();
    },
    [comment, props.createComment, setComment],
  );

  const value = useMemo(() => {
    return {
      comment,
      setComment,
      commentFormRef,
      getFormPositionOnPage,
      commentFormIsVisible: formIsVisible,
      inputRef,
      onSubmit,
      loading: props.loading,
      error: props.error,
    };
  }, [
    comment,
    formIsVisible,
    getFormPositionOnPage,
    onSubmit,
    props.error,
    props.loading,
    setComment,
  ]);

  return (
    <CommentFormContext.Provider value={value}>
      {props.children}
    </CommentFormContext.Provider>
  );
}

export function useCommentFormContext(): CommentFormContextType {
  return useContextWithError(CommentFormContext);
}
