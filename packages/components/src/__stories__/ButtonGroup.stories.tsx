import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Button from "../Button";

const meta: Meta<typeof Button.Group> = {
  title: "Button.Group",
  component: Button.Group,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Button.Group>;

export const Basic: Story = {
  args: {
    children: [
      <Button key="one">Name</Button>,
      <Button.Link key="two">cancel</Button.Link>,
    ],
  },
};

export const Reverse: Story = {
  args: {
    children: [
      <Button.Link key="one">cancel</Button.Link>,
      <Button key="two">Name</Button>,
    ],
  },
};
