import { AiFillDiscord } from "react-icons/ai";
import React from "react";
import TransparentButtonWithIcon from ".";

type Props = {
  href: string;
  dark?: boolean;
  className?: string;
};

export default function ForDiscord(props: Props) {
  return (
    <TransparentButtonWithIcon
      {...props}
      aria-label="discord-link"
      data-cy="discord-link"
      icon={<AiFillDiscord />}
    >
      Discord
    </TransparentButtonWithIcon>
  );
}
