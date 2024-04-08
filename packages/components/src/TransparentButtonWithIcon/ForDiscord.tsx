import { FaDiscord } from "@react-icons/all-files/fa/FaDiscord";
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
      icon={<FaDiscord />}
    >
      Discord
    </TransparentButtonWithIcon>
  );
}
