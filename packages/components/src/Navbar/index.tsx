import React, { ReactNode } from "react";
import ForMobile from "./ForMobile";

type Props = {
  logo: ReactNode;
  children: ReactNode;
  mobileBottomLinks?: ReactNode;
  bgColor?: string;
  className?: string;
};

export default function Navbar(props: Props) {
  return <ForMobile {...props}>{props.children}</ForMobile>;
}
