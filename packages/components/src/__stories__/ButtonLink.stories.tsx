import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import React from "react";
import Button from "../Button";

const meta: Meta<typeof Button.Link> = {
  title: "Button.Link",
  component: Button.Link,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Button.Link>;

export const Default: Story = {
  args: {
    children: "Button name",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole("button");

    await userEvent.click(button);
  },
};

// State

export const Disabled: Story = {
  args: {
    children: "Button name",
    disabled: true,
  },
};

export const Underlined: Story = {
  args: {
    children: "Button name",
    underlined: true,
  },
};

// Size

export const Small: Story = {
  args: {
    children: "Button name",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    children: "Button name",
    size: "large",
  },
};

// Icon

export const WithIcon: Story = {
  args: {
    children: "Button name",
    icon: <AiOutlinePlus />,
  },
};

// Color

export const Green: Story = {
  args: {
    children: "Button name",
    color: "green",
  },
};

export const Red: Story = {
  args: {
    children: "Button name",
    color: "red",
  },
};

export const Dark: Story = {
  args: {
    children: "Button name",
    color: "dark",
  },
};
