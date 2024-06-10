import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaPencilAlt } from "@react-icons/all-files/fa/FaPencilAlt";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Button from "../Button";
import FieldWithButton from "../FieldWithButton";

const meta: Meta<typeof FieldWithButton> = {
  title: "FieldWithButton",
  component: FieldWithButton,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof FieldWithButton>;

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

export const WithButton: Story = {
  args: {
    ...WithLabel.args,
    button: (
      <Button.Link>
        <FaPencilAlt />
      </Button.Link>
    ),
  },
};
