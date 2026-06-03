import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { RiStarLine } from "@react-icons/all-files/ri/RiStarLine";
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

const UNITS: Array<[number, string]> = [
  [1e12, "t"],
  [1e9, "b"],
  [1e6, "m"],
  [1e3, "k"],
];

// Formats a count with a single decimal and a lowercase magnitude suffix,
// matching the previous numeral "0.0a" output (e.g. 10900 -> "10.9k").
function compactCount(count: number): string {
  const unit = UNITS.find(([threshold]) => Math.abs(count) >= threshold);
  if (unit) {
    const [threshold, suffix] = unit;
    return `${(count / threshold).toFixed(1)}${suffix}`;
  }
  return count.toFixed(1);
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
