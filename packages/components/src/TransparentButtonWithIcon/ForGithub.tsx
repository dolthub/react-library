import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { RiStarLine } from "@react-icons/all-files/ri/RiStarLine";
import numeral from "numeral";
import React from "react";
import TransparentButtonWithIcon from ".";

type Props = {
  githubStarCount: number;
  href: string;
  dark?: boolean;
};

export default function ForGithub(props: Props) {
  return (
    <TransparentButtonWithIcon
      aria-label="github-link"
      data-cy="github-link"
      href={props.href}
      icon={<FaGithub />}
      dark={props.dark}
    >
      <>
        <RiStarLine />
        <span>{numeral(props.githubStarCount).format("0.0a")}</span>
      </>
    </TransparentButtonWithIcon>
  );
}
