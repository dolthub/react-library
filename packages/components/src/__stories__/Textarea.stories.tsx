import type { Meta, StoryObj } from "@storybook/react";
import Textarea from "../Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Textarea",
  component: Textarea,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Basic: Story = {
  args: {
    label: "Label",
    value: "test",
  },
};

export const Horizontal: Story = {
  args: {
    label: "Label",
    value: "test",
    horizontal: true,
  },
};

export const HasError: Story = {
  args: {
    label: "Label",
    value: "test",
    hasError: true,
  },
};

export const Light: Story = {
  args: {
    label: "Label",
    value: "test",
    light: true,
  },
};
