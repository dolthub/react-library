import type { Meta, StoryObj } from "@storybook/react";
import Checkbox from "../Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const NotChecked: Story = {
  args: {
    label: "Label",
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: "Label",
    checked: true,
  },
};

export const NoLabel: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Label",
    checked: false,
    disabled: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: "Label",
    description: "Description",
    checked: false,
  },
};

export const DisabledWithDescription: Story = {
  args: {
    label: "Label",
    description: "Description",
    checked: true,
    disabled: true,
  },
};

export const Blue: Story = {
  args: {
    label: "Label",
    checked: true,
    blue: true,
  },
};

export const AllBlue: Story = {
  args: {
    label: "Label",
    checked: true,
    allBlue: true,
  },
};

export const UncheckedBlue: Story = {
  args: {
    label: "Label",
    checked: false,
    blue: true,
    description: "Description",
  },
};

export const BlueDisabledWithDescription: Story = {
  args: {
    label: "Label",
    description: "Description",
    checked: true,
    disabled: true,
    blue: true,
  },
};
