import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { RiStarLine } from "@react-icons/all-files/ri/RiStarLine";
import numeral from "numeral";
import React from "react";
import TransparentButtonWithIcon from ".";

type Props = {
  githubStarCount: number;
  href: string;
  dark?: boolean;
  className?: string;
  numeralFormat?: string;
};

export default function ForGithub(props: Props) {
  return (
    <TransparentButtonWithIcon
      {...props}
      aria-label="github-link"
      data-cy="github-link"
      icon={<FaGithub />}
    >
      <>
        <RiStarLine />
        <span>
          {numeral(props.githubStarCount).format(props.numeralFormat ?? "0.0a")}
        </span>
      </>
    </TransparentButtonWithIcon>
  );
}
