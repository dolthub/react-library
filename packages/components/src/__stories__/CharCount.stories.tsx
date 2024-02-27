import type { Meta, StoryObj } from "@storybook/react";
import CharCount from "../CharCount";

const meta: Meta<typeof CharCount> = {
  title: "CharCount",
  component: CharCount,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CharCount>;

export const WithinLimit: Story = {
  args: {
    desc: "short desc",
  },
};

export const TooLong: Story = {
  args: {
    desc: "abc".repeat(2048),
  },
};

export const CustomMax: Story = {
  args: {
    desc: "short desc",
    maxChar: 10,
  },
};
