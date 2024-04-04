import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import CopyableField from "../CopyableField";

const meta: Meta<typeof CopyableField> = {
  title: "CopyableField",
  component: CopyableField,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CopyableField>;

export const Default: Story = {
  args: {
    value: "value",
  },
};

export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: "Label",
  },
};

export const HideValue: Story = {
  args: {
    ...WithLabel.args,
    hideValue: true,
  },
};

export const WithChildren: Story = {
  args: {
    ...WithLabel.args,
    children: <FaGithub />,
  },
};

export const WithHelp: Story = {
  args: {
    ...WithLabel.args,
    help: <span className="absolute -left-4 top-1">?</span>,
  },
};

export const Blue: Story = {
  args: {
    ...WithLabel.args,
    children: <FaGithub />,
    blue: true,
  },
};

export const SmallValue: Story = {
  args: {
    ...WithLabel.args,
    smallValue: true,
  },
};

export const Vertical: Story = {
  args: {
    ...WithLabel.args,
    vertical: true,
  },
};

export const Blur: Story = {
  args: {
    label: "Password",
    value: "blur me",
    blur: true,
  },
};
