import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
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
    trigger: <button type="button">Click me</button>,
  },
};

export const Hover: Story = {
  args: {
    children: <span>Show me on hover</span>,
    trigger: <button type="button">Hover over me</button>,
    on: "hover",
  },
};
