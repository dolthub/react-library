import { FaDiscord } from "@react-icons/all-files/fa/FaDiscord";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import TransparentButtonWithIcon from "../TransparentButtonWithIcon";

const meta: Meta<typeof TransparentButtonWithIcon> = {
  title: "TransparentButtonWithIcon",
  component: TransparentButtonWithIcon,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TransparentButtonWithIcon>;

export const Basic: Story = {
  args: {
    href: "https://www.google.com",
    icon: <FaDiscord />,
    children: "Discord",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Dark: Story = {
  args: {
    ...Basic.args,
    dark: true,
  },
};
