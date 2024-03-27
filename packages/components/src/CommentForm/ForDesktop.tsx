import React from "react";
import Inner from "./Inner";
import { CommonProps } from "./types";

export default function ForDesktop({ children, ...props }: CommonProps) {
  return (
    <Inner {...props} unroundBottom={!!children}>
      {children}
    </Inner>
  );
}
