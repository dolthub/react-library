import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { AiOutlineMenu } from "@react-icons/all-files/ai/AiOutlineMenu";
import cx from "classnames";
import React, { ReactNode, useState } from "react";
import Btn from "../../Btn";
import css from "./index.module.css";

type CommonProps = {
  logo: ReactNode;
  bgColor?: string;
};

type Props = CommonProps & {
  dark?: boolean;
  children: ReactNode;
  mobileBottomLinks?: ReactNode;
  className?: string;
};

export default function ForMobile(props: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cx(css.container, props.className)}>
      <Top
        {...props}
        className={cx({
          [css.darkTop]: props.dark,
        })}
        icon={
          <Btn
            onClick={() => setOpen(true)}
            data-cy="mobile-navbar-menu-button"
            aria-label="open mobile navbar menu"
          >
            <AiOutlineMenu />
          </Btn>
        }
      />
      {open && (
        <NavMenu {...props} onClose={() => setOpen(false)}>
          {props.children}
        </NavMenu>
      )}
    </div>
  );
}

type NavProps = CommonProps & {
  onClose: () => void;
  children: ReactNode;
  mobileBottomLinks?: ReactNode;
};

function NavMenu(props: NavProps) {
  return (
    <div className={cx(css.openMenu, getBgColor(props.bgColor, true))}>
      <Top
        {...props}
        icon={
          <Btn
            onClick={props.onClose}
            data-cy="mobile-navbar-close-button"
            aria-label="close mobile navbar menu"
          >
            <AiOutlineClose />
          </Btn>
        }
      />
      <div className={css.links}>{props.children}</div>
      {props.mobileBottomLinks && (
        <div className={css.bottomLinks} data-cy="mobile-navbar-social-links">
          {props.mobileBottomLinks}
        </div>
      )}
    </div>
  );
}

type TopProps = CommonProps & {
  icon: ReactNode;
  className?: string;
};

function Top(props: TopProps) {
  return (
    <div
      className={cx(
        css.topContainer,
        getBgColor(props.bgColor),
        props.className,
      )}
    >
      <div className={css.top}>
        {props.icon}
        <div className={css.logo}>{props.logo}</div>
        <div className={css.emptyTop} />
      </div>
    </div>
  );
}

function getBgColor(bgColor?: string, forMenu = false): string {
  if (bgColor) {
    if (bgColor === "bg-transparent" && forMenu) {
      return "bg-background-acc-1";
    }
    return bgColor;
  }
  return "bg-background-acc-1";
}
