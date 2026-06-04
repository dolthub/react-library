import cx from "classnames";
import React, { ReactNode } from "react";
import Spinner from "../Spinner";
import css from "./index.module.css";

interface LoaderOptions {
  lines?: number;
  length?: number;
  width?: number;
  radius?: number;
  scale?: number;
  corners?: number;
  color?: string;
  opacity?: number;
  rotate?: number;
  direction?: number;
  speed?: number;
  trail?: number;
  fps?: number;
  zIndex?: number;
  top?: string;
  left?: string;
  shadow?: boolean;
  hwaccel?: boolean;
  position?: string;
  loadedClassName?: string;
}

interface LoaderProps extends LoaderOptions {
  loaded: boolean;
  options?: LoaderOptions;
  className?: string;
  children?: ReactNode;
}

// Fixed loader in center of viewport. Renders children once loaded, otherwise a
// spinner centered in the viewport.
export default function Loader({
  loaded,
  options,
  className,
  children,
  ...rest
}: LoaderProps) {
  if (loaded) {
    return <>{children}</>;
  }

  const { lines, length, width, radius, color, speed, opacity } = {
    ...rest,
    ...options,
  };

  return (
    <div className={cx(css.fixedCenter, className)}>
      <Spinner
        lines={lines}
        length={length}
        width={width}
        radius={radius}
        color={color}
        speed={speed}
        opacity={opacity}
      />
    </div>
  );
}
