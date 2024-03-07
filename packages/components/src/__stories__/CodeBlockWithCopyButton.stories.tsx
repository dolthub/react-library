import { nTimesWithIndex } from "@dolthub/web-utils";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import CodeBlock from "../CodeBlock";

const meta: Meta<typeof CodeBlock.WithCopyButton> = {
  title: "CodeBlock.WithCopyButton",
  component: CodeBlock.WithCopyButton,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CodeBlock.WithCopyButton>;

export const Default: Story = {
  args: {
    textToCopy: "const a = 1 + b;",
  },
};

export const WithChildren: Story = {
  args: {
    children: <span>const a = 1 + b;</span>,
  },
};

export const Disabled: Story = {
  args: {
    textToCopy: "const a = 1 + b;",
    disabled: true,
  },
};

export const MultiLine: Story = {
  args: {
    textToCopy: `const a = 1 + b;
const b = 1 + a;`,
  },
};

export const Long: Story = {
  args: {
    textToCopy: nTimesWithIndex(10, i => `const a${i} = ${i} + b;`).join(" "),
  },
};

export const Small: Story = {
  args: {
    textToCopy: "const a = 1 + b;",
    small: true,
  },
};
