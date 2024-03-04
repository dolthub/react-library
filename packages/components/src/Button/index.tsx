import cx from "classnames";
import React, { ButtonHTMLAttributes } from "react";
import css from "./index.module.css";

type ColorProps = {
  red?: boolean;
  green?: boolean;
  dark?: boolean;
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & ColorProps;

const Button = ({
  children,
  className,
  red = false,
  green = false,
  dark = false,
  ...props
}: Props) => (
  <button
    className={cx(
      css.button,
      { [css.red]: red, [css.green]: green, [css.dark]: dark },
      className,
    )}
    type="button"
    // These props need to come last
    {...props}
  >
    {children}
  </button>
);

type LinkProps = Props & {
  underlined?: boolean;
};

const Link = ({
  children,
  className,
  red = false,
  green = false,
  dark = false,
  underlined = false,
  ...props
}: LinkProps) => (
  <button
    className={cx(
      css.link,
      {
        [css.redText]: red,
        [css.greenText]: green,
        [css.darkText]: dark,
        [css.underlined]: underlined,
      },
      className,
    )}
    type="button"
    // These props need to come last
    {...props}
  >
    {children}
  </button>
);

Button.Link = Link;

type GroupProps = {
  children: React.ReactNode;
  className?: string;
};

const Group = ({ children, className }: GroupProps) => (
  <div className={cx(css.group, className)} aria-label="button-group">
    {children}
  </div>
);

Button.Group = Group;

export default Button;
