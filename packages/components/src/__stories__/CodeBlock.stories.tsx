import { nTimesWithIndex } from "@dolthub/web-utils";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import CodeBlock from "../CodeBlock";

const meta: Meta<typeof CodeBlock> = {
  title: "CodeBlock",
  component: CodeBlock,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CodeBlock>;

export const Default: Story = {
  args: {
    children: <code>const a = 1 + b;</code>,
  },
};

export const Disabled: Story = {
  args: {
    children: <code>const a = 1 + b;</code>,
    disabled: true,
  },
};

export const MultiLine: Story = {
  args: {
    children: (
      <code>
        const a = 1 + b;
        <br />
        const c = 2 + d;
      </code>
    ),
  },
};

export const Long: Story = {
  args: {
    children: (
      <code>
        {nTimesWithIndex(10, i => `const a${i} = ${i} + b;`).join(" ")}
      </code>
    ),
  },
};
