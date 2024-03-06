import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Button from "../Button";
import Popup from "../Popup";

const meta: Meta<typeof Popup> = {
  title: "Popup",
  component: Popup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Popup>;

export const Basic: Story = {
  args: {
    children: <span>Show me on click</span>,
    trigger: (
      <div>
        <Button.Link>Click me</Button.Link>
      </div>
    ),
  },
};

export const Hover: Story = {
  args: {
    children: <span>Show me on hover</span>,
    trigger: (
      <div>
        <Button.Link>Hover over me</Button.Link>
      </div>
    ),
    on: "hover",
  },
};
