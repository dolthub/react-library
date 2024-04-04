import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Tooltip from "../Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
  args: {
    id: "tooltip-id",
  },
  decorators: [
    story => (
      <>
        <span
          data-tooltip-id="tooltip-id"
          data-tooltip-content="tooltip content"
          data-tooltip-place="bottom"
        >
          hover on me
        </span>
        {story()}
      </>
    ),
  ],
};
