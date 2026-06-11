import React, { MouseEvent, ReactElement, cloneElement } from "react";
import copyToClipboard from "./copy";

type ChildProps = {
  onClick?: (event: MouseEvent<HTMLElement>) => void;
};

type Props = {
  text: string;
  onCopy?: (text: string, result: boolean) => void;
  children: ReactElement<ChildProps>;
};

// Drop-in replacement for the stale react-copy-to-clipboard package: wraps a
// single child and copies `text` to the clipboard when the child is clicked,
// then invokes onCopy followed by the child's own onClick (matching the
// original component's order).
export default function CopyToClipboard({ text, onCopy, children }: Props) {
  const child = React.Children.only(children);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    const result = copyToClipboard(text);
    if (onCopy) onCopy(text, result);
    child.props.onClick?.(event);
  };

  return cloneElement(child, { onClick: handleClick });
}
