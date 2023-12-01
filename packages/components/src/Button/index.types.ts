import { ButtonHTMLAttributes } from "react";

export type ColorProps = {
  red?: boolean;
  green?: boolean;
  pill?: boolean;
  white?: boolean;
  gradientBg?: boolean;
};

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & ColorProps;
