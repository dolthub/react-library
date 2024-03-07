import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ButtonWithPopup from "../ButtonWithPopup";

const meta: Meta<typeof ButtonWithPopup> = {
  title: "ButtonWithPopup",
  component: ButtonWithPopup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof ButtonWithPopup>;

export const Basic: Story = {
  args: {
    children: <div>Items</div>,
    triggerText: "Action",
  },
};

export const NoText: Story = {
  args: {
    children: <div>Items</div>,
  },
};
