import type { Meta, StoryObj } from "@storybook/react";
import Button from "../Button";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Solid: Story = {
  args: {
    children: "Button name",
  },
};

export const Green: Story = {
  args: {
    children: "Button name",
    green: true,
  },
};

export const Red: Story = {
  args: {
    children: "Button name",
    red: true,
  },
};

export const Dark: Story = {
  args: {
    children: "Button name",
    dark: true,
  },
};

export const White: Story = {
  args: {
    children: "Button name",
    white: true,
    pill: true,
  },
};

export const Gradient: Story = {
  args: {
    children: "Button name",
    gradient: true,
    pill: true,
  },
};

export const Pill: Story = {
  args: {
    children: "Button name",
    pill: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Button name",
    disabled: true,
  },
};

export const DisabledRed: Story = {
  args: {
    children: "Button name",
    disabled: true,
    red: true,
  },
};

export const DisabledGreen: Story = {
  args: {
    children: "Button name",
    disabled: true,
    green: true,
  },
};

export const DisabledDark: Story = {
  args: {
    children: "Button name",
    disabled: true,
    dark: true,
  },
};
