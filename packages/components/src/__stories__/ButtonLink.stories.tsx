import type { Meta, StoryObj } from "@storybook/react";
import Button from "../Button";

const meta: Meta<typeof Button.Link> = {
  title: "Button.Link",
  component: Button.Link,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Button.Link>;

export const Basic: Story = {
  args: {
    children: "Link button name",
  },
};

export const Green: Story = {
  args: {
    children: "Link button name",
    green: true,
  },
};

export const Red: Story = {
  args: {
    children: "Link button name",
    red: true,
  },
};

export const Dark: Story = {
  args: {
    children: "Link button name",
    dark: true,
  },
};

export const Underlined: Story = {
  args: {
    children: "Link button name",
    underlined: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Link button name",
    disabled: true,
  },
};

export const DisabledRed: Story = {
  args: {
    children: "Link button name",
    disabled: true,
    red: true,
  },
};

export const DisabledGreen: Story = {
  args: {
    children: "Link button name",
    disabled: true,
    green: true,
  },
};

export const DisabledDark: Story = {
  args: {
    children: "Link button name",
    disabled: true,
    dark: true,
  },
};

export const DisabledUnderlined: Story = {
  args: {
    children: "Link button name",
    disabled: true,
    underlined: true,
  },
};
