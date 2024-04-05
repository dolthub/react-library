import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByRole("input");
    await userEvent.type(input, "test");

    const availableOptions = await canvas.findByDisplayValue("test");
    await expect(availableOptions).toBeVisible();
  },
};

export const Longer: Story = {
  args: {
    label: "Label",
    value: "testing this longer input with a longer value",
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
  parameters: {
    viewport: { defaultViewport: "iphonex" },
    backgrounds: { default: "lightish" },
  },
};

export const Blue: Story = {
  args: {
    label: "Label",
    value: "test",
    blue: true,
  },
};

export const BlueText: Story = {
  args: {
    label: "Label",
    value: "test",
    blueText: true,
  },
  name: "Blue Text (Hosted)",
};

export const Pill: Story = {
  args: {
    label: "Label",
    value: "test",
    pill: true,
  },
  name: "Pill (Hosted)",
};
