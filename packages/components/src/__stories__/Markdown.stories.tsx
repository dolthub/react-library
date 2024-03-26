import type { Meta, StoryObj } from "@storybook/react";
import Markdown from "../Markdown";

const meta: Meta<typeof Markdown> = {
  title: "Markdown",
  component: Markdown,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Markdown>;

const markdown = `
# Heading 1

This is a paragraph with some **bold** and *italic* text.

## Heading 2

This is a paragraph with a [link](https://example.com).

And a list:
- Item 1
- Item 2
- Item 3
`;

export const Basic: Story = {
  args: {
    value: markdown,
  },
};

export const MaxHeight: Story = {
  args: {
    value: markdown,
    hasMaxHeight: true,
  },
};

export const BaseText: Story = {
  args: {
    value: markdown,
    baseTextSize: true,
  },
};
