import type { Meta, StoryObj } from "@storybook/react";
import NoneFoundMsg from "../NoneFoundMsg";

const meta: Meta<typeof NoneFoundMsg> = {
  title: "NoneFoundMsg",
  component: NoneFoundMsg,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof NoneFoundMsg>;

export const Default: Story = {
  args: {
    children: "No items found",
  },
};
