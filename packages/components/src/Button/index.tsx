import cx from "classnames";
import React, { ButtonHTMLAttributes } from "react";
import css from "./index.module.css";

type VariantProps = {
  red?: boolean;
  green?: boolean;
  dark?: boolean;
  pill?: boolean;
  white?: boolean;
  gradient?: boolean;
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
type Props = ButtonProps & VariantProps;

const Button = ({
  children,
  className,
  red = false,
  green = false,
  dark = false,
  pill = false,
  white = false,
  gradient = false,
  ...props
}: Props) => (
  <button
    className={cx(
      css.button,
      {
        [css.red]: red,
        [css.green]: green,
        [css.dark]: dark,
        [css.pill]: pill,
        [css.white]: white,
        [css.gradient]: gradient,
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

const Outlined = ({
  children,
  className,
  pill = false,
  ...props
}: ButtonProps & { pill?: boolean }) => (
  <button
    className={cx(css.outlined, { [css.pill]: pill }, className)}
    type="button"
    // These props need to come last
    {...props}
  >
    {children}
  </button>
);

Button.Outlined = Outlined;

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