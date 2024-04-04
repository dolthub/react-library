import type { Meta, StoryObj } from "@storybook/react";
import CopyButton from "../CopyButton";

const meta: Meta<typeof CopyButton> = {
  title: "CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CopyButton>;

export const Default: Story = {
  args: {
    text: "value",
  },
};

export const Light: Story = {
  args: {
    ...Default.args,
    light: true,
  },
};
