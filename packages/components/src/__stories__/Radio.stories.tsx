import type { Meta, StoryObj } from "@storybook/react";
import Radio from "../Radio";

const meta: Meta<typeof Radio> = {
  title: "Radio",
  component: Radio,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Radio>;

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
