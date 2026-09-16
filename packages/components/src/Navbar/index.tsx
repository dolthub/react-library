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
  large?: boolean;
  logoLeft?: boolean;

  // Mobile-only
  mobileActions?: ReactNode; // Full-width call to action below the links
  mobileBottomLinks?: ReactNode;
  leftLinksMobile?: ReactNode; // Overrides `leftLinks` for mobile
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
      />
      <MobileNavbar
        bgColor={props.bgColor}
        logo={props.logo}
        mobileActions={props.mobileActions}
        mobileBottomLinks={props.mobileBottomLinks}
        dark={props.dark}
      >
        {props.leftLinksMobile ?? props.leftLinks}
        {props.rightLinksMobile ?? props.rightLinks}
      </MobileNavbar>
    </>
  );
}
