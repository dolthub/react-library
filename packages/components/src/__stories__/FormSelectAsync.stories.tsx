import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import React from "react";
import FormSelect from "../FormSelect";

const meta: Meta<typeof FormSelect.Async> = {
  title: "FormSelect.Async",
  component: FormSelect.Async,
  tags: ["autodocs"],
  decorators: [story => <div className="max-w-[300px] mb-24">{story()}</div>],
};

export default meta;

type Story = StoryObj<typeof FormSelect.Async>;

const options = [
  { value: "one", label: "One" },
  { value: "two", label: "Two" },
  { value: "three", label: "Three", isDisabled: true },
];

export const Default: Story = {
  args: {
    label: "Label",
    loadOptions: async () => options,
    value: options[0],
    placeholder: "select or type...",
    isClearable: true,
    defaultOptions: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const select = canvas.getByRole("combobox");
    await userEvent.click(select);

    options.forEach(async option => {
      const optionLabel = await canvas.findByLabelText(
        `select-option-${option.value}`,
      );
      await expect(optionLabel).toHaveTextContent(option.label);
    });
  },
};

export const IsMulti: Story = {
  args: {
    label: "Label",
    loadOptions: async () => options,
    value: [options[0], options[1]],
    placeholder: "select or type...",
    isMulti: true,
    isClearable: true,
    defaultOptions: true,
  },
};

export const IsMultiLight: Story = {
  args: {
    label: "Label",
    loadOptions: async () => options,
    value: [options[0], options[1]],
    placeholder: "select or type...",
    isMulti: true,
    isClearable: true,
    defaultOptions: true,
    light: true,
  },
};

export const IsMultiBlue: Story = {
  args: {
    label: "Label",
    loadOptions: async () => options,
    value: [options[0], options[1]],
    placeholder: "select or type...",
    isMulti: true,
    isClearable: true,
    defaultOptions: true,
    blue: true,
  },
};
