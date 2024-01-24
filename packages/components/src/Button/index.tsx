import cx from "classnames";
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import css from "./index.module.css";

type ColorProps = {
  // red?: boolean;
  // green?: boolean;
  // pill?: boolean;
  // white?: boolean;
  // gradientBg?: boolean;
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & ColorProps;

export default function Button({
  children,
  className,
  // red = false,
  // pill = false,
  // green = false,
  // gradientBg = false,
  // white = false,
  ...props
}: Props) {
  return (
    <button
      className={cx(
        css.button,
        // {
        //   [css.redBg]: red,
        //   [css.greenBg]: green,
        //   [css.pill]: pill,
        //   [css.gradientBg]: gradientBg,
        //   [css.whiteBg]: white,
        // },
        className,
      )}
      type="button"
      // These props need to come last
      {...props}
    >
      {children}
    </button>
  );
}

const Link = ({
  children,
  className,
  // red = false,
  // green = false,
  ...props
}: Props) => (
  <button
    className={cx(
      css.buttonLink,
      // {
      //   [css.redText]: red,
      //   [css.greenText]: green,
      // },
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
  children: ReactNode;
  className?: string;
  ["data-cy"]?: string;
};

const Group = ({ children, className, ...props }: GroupProps) => (
  <div
    className={cx(css.buttonGroup, className)}
    aria-label="button-group"
    data-cy={props["data-cy"]}
  >
    {children}
  </div>
);

Button.Group = Group;
