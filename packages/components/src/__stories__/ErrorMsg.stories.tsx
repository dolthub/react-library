import type { Meta, StoryObj } from "@storybook/react";
import ErrorMsg from "../ErrorMsg";

const meta: Meta<typeof ErrorMsg> = {
  title: "ErrorMsg",
  component: ErrorMsg,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ErrorMsg>;

export const Default: Story = {
  args: {
    errString: "This is an error",
  },
};
