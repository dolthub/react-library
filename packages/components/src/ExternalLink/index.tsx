import React, { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  ["data-cy"]?: string;
};

export default function ExternalLink(props: Props) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );
}
