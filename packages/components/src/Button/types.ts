import { ButtonHTMLAttributes, ReactNode } from "react";

type Color = "default" | "red" | "green" | "dark" | "white" | "gradient";
type Size = "small" | "medium" | "large";
type Shape = "default" | "pill";

type VariantProps = {
  color?: Color;
  size?: Size;
  shape?: Shape;
  icon?: ReactNode;
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
export type Props = ButtonProps & VariantProps;
