import type { Meta, StoryObj } from "@storybook/react";
import FormInput from "../FormInput";

const meta: Meta<typeof FormInput> = {
  title: "FormInput",
  component: FormInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof FormInput>;

export const Basic: Story = {
  args: {
    label: "Label",
    value: "test",
  },
};

export const Placeholder: Story = {
  args: {
    label: "Label",
    value: "",
    placeholder: "Placeholder",
  },
};

export const Horizontal: Story = {
  args: {
    label: "Label",
    value: "test",
    horizontal: true,
  },
};

export const HasError: Story = {
  args: {
    label: "Label",
    value: "test",
    hasError: true,
  },
};

export const Light: Story = {
  args: {
    label: "Label",
    value: "test",
    light: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: "Label",
    description: "Description",
    value: "test",
  },
};

export const MobileFriendly: Story = {
  args: {
    label: "Label",
    value: "test",
    mobileFriendly: true,
  },
};
