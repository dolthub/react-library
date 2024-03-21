import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
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

export const WhitePill: Story = {
  args: {
    children: "Button name",
    white: true,
    pill: true,
  },
  parameters: {
    backgrounds: { default: "lightish" },
  },
  name: "White Pill (Hosted)",
};

export const GradientPill: Story = {
  args: {
    children: "Button name",
    gradient: true,
    pill: true,
  },
  name: "Gradient Pill (Hosted)",
};

export const Pill: Story = {
  args: {
    children: "Button name",
    pill: true,
  },
  name: "Pill (Hosted)",
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

export const DisabledWhite: Story = {
  args: {
    children: "Button name",
    disabled: true,
    white: true,
  },
};
