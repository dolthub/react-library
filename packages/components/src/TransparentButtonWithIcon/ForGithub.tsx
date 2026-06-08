import { FaGithub } from "react-icons/fa";
import { RiStarLine } from "react-icons/ri";
import React from "react";
import TransparentButtonWithIcon from ".";

type Props = {
  githubStarCount: number;
  href: string;
  dark?: boolean;
  className?: string;
  // Override how the star count is rendered. Defaults to a compact format
  // (e.g. 10900 -> "10.9k").
  formatStarCount?: (count: number) => string;
};

// [minimum value to abbreviate, divisor the suffix stands for, suffix]. "k"
// only kicks in at 10,000 so that 1,000-9,999 keep their full comma form.
const UNITS: Array<[number, number, string]> = [
  [1e12, 1e12, "t"],
  [1e9, 1e9, "b"],
  [1e6, 1e6, "m"],
  [1e4, 1e3, "k"],
];

// Formats a star count: 10,000+ abbreviate with a single decimal and a
// lowercase magnitude suffix (e.g. 10900 -> "10.9k"); anything below that is
// shown in full with thousands separators (e.g. 1000 -> "1,000", 42 -> "42").
function compactCount(count: number): string {
  const unit = UNITS.find(([min]) => Math.abs(count) >= min);
  if (unit) {
    const [, divisor, suffix] = unit;
    return `${(count / divisor).toFixed(1)}${suffix}`;
  }
  return count.toLocaleString("en-US");
}

export default function ForGithub({
  githubStarCount,
  formatStarCount = compactCount,
  ...props
}: Props) {
  return (
    <TransparentButtonWithIcon
      {...props}
      aria-label="github-link"
      data-cy="github-link"
      icon={<FaGithub />}
    >
      <>
        <RiStarLine />
        <span>{formatStarCount(githubStarCount)}</span>
      </>
    </TransparentButtonWithIcon>
  );
}
