import { ButtonHTMLAttributes, ReactNode } from "react";

export type Color = "default" | "red" | "green" | "dark" | "white" | "gradient";
type Size = "small" | "medium" | "large";
export type Shape = "default" | "pill";

type VariantProps = {
  color?: Color;
  size?: Size;
  shape?: Shape;
  icon?: ReactNode;
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
export type Props = ButtonProps & VariantProps;
