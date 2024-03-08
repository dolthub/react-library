import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import FormSelect from "../FormSelect";
import { mobileDarkStyles, mobileLightStyles } from "../FormSelect/styles";

const meta: Meta<typeof FormSelect> = {
  title: "FormSelect",
  component: FormSelect,
  tags: ["autodocs"],
  decorators: [story => <div className="max-w-[300px] mb-24">{story()}</div>],
};

export default meta;

type Story = StoryObj<typeof FormSelect>;

const options = [
  { value: "one", label: "One" },
  { value: "two", label: "Two" },
  { value: "three", label: "Three", isDisabled: true },
];

export const Default: Story = {
  args: {
    label: "Label",
    options,
    val: "one",
  },
};

export const NoLabel: Story = {
  args: {
    options,
    val: "two",
  },
};

export const NoValue: Story = {
  args: {
    label: "Label",
    options,
    hideSelectedOptions: true,
  },
};

export const Light: Story = {
  args: {
    label: "Label",
    options,
    val: "one",
    light: true,
  },
};

export const Blue: Story = {
  args: {
    label: "Label",
    options,
    val: "one",
    blue: true,
  },
};

export const Pill: Story = {
  args: {
    label: "Label",
    options,
    val: "one",
    pill: true,
  },
};

export const Mono: Story = {
  args: {
    label: "Label",
    options,
    val: "one",
    mono: true,
  },
};

export const Small: Story = {
  args: {
    label: "Label",
    options,
    val: "one",
    small: true,
  },
};

export const TransparentBorder: Story = {
  args: {
    options,
    val: "one",
    transparentBorder: true,
    pill: true,
  },
  parameters: {
    backgrounds: { default: "blue" },
  },
};

export const Horizontal: Story = {
  args: {
    label: "Label",
    options,
    val: "one",
    horizontal: true,
  },
};

export const MobileLight: Story = {
  args: {
    val: "two",
    options,
    customStyles: () => mobileLightStyles,
  },
};

export const MobileDark: Story = {
  args: {
    val: "two",
    options,
    customStyles: () => mobileDarkStyles,
  },
  parameters: { backgrounds: { default: "dark" } },
};
