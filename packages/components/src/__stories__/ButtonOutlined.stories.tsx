import type { Meta, StoryObj } from "@storybook/react";
import Button from "../Button";

const meta: Meta<typeof Button.Outlined> = {
  title: "Button.Outlined",
  component: Button.Outlined,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Button.Outlined>;

export const Solid: Story = {
  args: {
    children: "Button name",
  },
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
