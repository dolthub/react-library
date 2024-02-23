import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ExternalLink from "../ExternalLink";

const meta: Meta<typeof ExternalLink> = {
  title: "ExternalLink",
  component: ExternalLink,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ExternalLink>;

export const Default: Story = {
  args: {
    href: "https://dolthub.com",
    children: <span>Go to DoltHub in new tab</span>,
  },
};
