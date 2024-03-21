import type { Meta, StoryObj } from "@storybook/react";
import TextareaWithMarkdown from "../TextareaWithMarkdown";

const meta: Meta<typeof TextareaWithMarkdown> = {
  title: "TextareaWithMarkdown",
  component: TextareaWithMarkdown,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TextareaWithMarkdown>;

const markdown = `# Heading one
Details
## Heading two

List:
- Item 1
- Item 2

[Link](https://www.google.com)
`;

export const Basic: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    rows: 10,
  },
};

export const WithValue: Story = {
  args: {
    label: "Label",
    value: markdown,
    rows: 10,
  },
};

export const MaxHeight: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    rows: 10,
    hasMaxHeight: true,
  },
};

export const MinHeight: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    rows: 6,
    hasMinHeight: true,
  },
};

export const SeparateTabs: Story = {
  args: {
    placeholder: "Placeholder",
    rows: 4,
    value: markdown,
    separateTabs: true,
  },
  parameters: {
    viewport: { defaultViewport: "iphonex" },
    backgrounds: { default: "lightish" },
  },
};

export const Unround: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    rows: 4,
    unroundBottom: true,
    unroundTop: true,
  },
};
