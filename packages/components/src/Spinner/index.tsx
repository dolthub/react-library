import cx from "classnames";
import React, { CSSProperties } from "react";
import css from "./index.module.css";

// SpinnerOptions mirrors the subset of the old react-loader/spin.js options that
// affect the visual: a ring of `lines` tapered bars, each `length` long and
// `width` thick, arranged `radius` from the center, fading from full opacity
// down to `opacity` to create the rotating trail.
export type SpinnerOptions = {
  lines?: number;
  length?: number;
  width?: number;
  radius?: number;
  color?: string;
  // Seconds for one bar to fade out; also the stagger period across the ring.
  speed?: number;
  // Opacity floor for the dimmest bar (the tail of the trail).
  opacity?: number;
};

type Props = SpinnerOptions & {
  className?: string;
  style?: CSSProperties;
};

// Defaults match react-loader's defaults so existing call sites look the same.
// They're applied via destructuring so that an explicit `undefined` (e.g. from a
// caller that forwards optional props) still falls back to the default.
export default function Spinner({
  className,
  style,
  lines = 12,
  length = 7,
  width = 5,
  radius = 10,
  color = "#000",
  speed = 1,
  opacity = 0.25,
}: Props) {
  const diameter = 2 * (radius + length);

  const bars = Array.from({ length: lines }, (_, i) => {
    const barStyle = {
      width,
      height: length,
      marginLeft: -width / 2,
      background: color,
      borderRadius: width,
      // Pivot about the spinner's center, which sits `radius + length` below
      // each bar's top edge, then rotate the bar into its slot in the ring.
      transformOrigin: `center ${radius + length}px`,
      transform: `rotate(${(360 / lines) * i}deg)`,
      animationDuration: `${speed}s`,
      // Negative, staggered delay so the bright bar is already mid-rotation.
      animationDelay: `${-(speed / lines) * (lines - i)}s`,
      "--min-opacity": opacity,
    } as CSSProperties;
    // eslint-disable-next-line react/no-array-index-key
    return <span key={i} className={css.bar} style={barStyle} />;
  });

  return (
    <span
      className={cx(css.spinner, className)}
      style={{ width: diameter, height: diameter, ...style }}
      role="progressbar"
      aria-label="Loading"
    >
      {bars}
    </span>
  );
}
