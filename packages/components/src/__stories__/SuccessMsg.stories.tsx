import type { Meta, StoryObj } from "@storybook/react";
import SuccessMsg from "../SuccessMsg";

const meta: Meta<typeof SuccessMsg> = {
  title: "SuccessMsg",
  component: SuccessMsg,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SuccessMsg>;

export const Default: Story = {
  args: {
    children: "This was a success",
  },
};
