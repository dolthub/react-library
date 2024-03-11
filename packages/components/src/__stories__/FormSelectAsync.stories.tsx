import type { Meta, StoryObj } from "@storybook/react";
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
};
