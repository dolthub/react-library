import { FaDiscord } from "@react-icons/all-files/fa/FaDiscord";
import React from "react";
import TransparentButtonWithIcon from ".";

type Props = {
  href: string;
  dark?: boolean;
};

export default function ForDiscord(props: Props) {
  return (
    <TransparentButtonWithIcon
      aria-label="discord-link"
      data-cy="discord-link"
      href={props.href}
      icon={<FaDiscord />}
      dark={props.dark}
    >
      Discord
    </TransparentButtonWithIcon>
  );
}
