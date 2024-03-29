import React, { ReactNode } from "react";
import DesktopNavbar from "./ForDesktop";
import MobileNavbar from "./ForMobile";

type Props = {
  leftLinks: ReactNode;
  rightLinks: ReactNode;
  logo: ReactNode;
  bgColor?: string;
  dark?: boolean;

  // Desktop-only
  desktopClassName?: string;
  large?: boolean;
  logoLeft?: boolean;

  // Mobile-only
  mobileClassName?: string;
  mobileBottomLinks?: ReactNode;
  rightLinksMobile?: ReactNode; // Overrides `rightLinks` for mobile
};

export default function Navbar(props: Props) {
  return (
    <>
      <DesktopNavbar
        leftLinks={props.leftLinks}
        rightLinks={props.rightLinks}
        bgColor={props.bgColor}
        logo={props.logo}
        dark={props.dark}
        large={props.large}
        logoLeft={props.logoLeft}
        className={props.desktopClassName}
      />
      <MobileNavbar
        bgColor={props.bgColor}
        logo={props.logo}
        className={props.mobileClassName}
        mobileBottomLinks={props.mobileBottomLinks}
        dark={props.dark}
      >
        {props.leftLinks}
        {props.rightLinksMobile ?? props.rightLinks}
      </MobileNavbar>
    </>
  );
}
