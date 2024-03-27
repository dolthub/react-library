import { useReactiveWidth } from "@dolthub/react-hooks";
import React from "react";
import ForDesktop from "./ForDesktop";
import ForMobile from "./ForMobile";
import { CommonProps } from "./types";

export default function CommentForm(props: CommonProps) {
  const { isMobile } = useReactiveWidth();
  return isMobile ? (
    <ForMobile {...props}>{props.children}</ForMobile>
  ) : (
    <ForDesktop {...props}>{props.children}</ForDesktop>
  );
}
