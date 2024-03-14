import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import FormSelect from "../FormSelect";
import { Option } from "../FormSelect/types";

const meta: Meta<typeof FormSelect.Grouped> = {
  title: "FormSelect.Grouped",
  component: FormSelect.Grouped,
  tags: ["autodocs"],
  decorators: [story => <div className="max-w-[300px] mb-48">{story()}</div>],
};

export default meta;

type Story = StoryObj<typeof FormSelect.Grouped>;

const optionsOne = [
  { value: "one", label: "One" },
  { value: "two", label: "Two" },
  { value: "three", label: "Three", isDisabled: true },
];

const optionsTwo = [
  { value: "four", label: "Four" },
  { value: "five", label: "Five" },
  { value: "six", label: "Six", isDisabled: true },
];

const options = [
  { label: "Group 1", options: optionsOne },
  { label: "Group 2", options: optionsTwo },
];

const noOptions = [
  { label: "Group 1", options: [], noOptionsMsg: "No options 1" },
  { label: "Group 2", options: [], noOptionsMsg: "No options 2" },
];

export const Default: Story = {
  args: {
    label: "Label",
    options,
    value: optionsOne[0],
    selectedGroupIndex: 0,
    setSelectedGroupIndex: () => {},
  },
};

export const SecondGroupSelected: Story = {
  args: {
    light: true,
    options,
    value: optionsTwo[1],
    selectedGroupIndex: 1,
    setSelectedGroupIndex: () => {},
    selectedOptionFirst: true,
  },
};

function Footer(props: { section: string }) {
  return (
    <a className="font-semibold text-link-1">Footer for {props.section}</a>
  );
}

export const WithFooter: Story = {
  args: {
    light: true,
    options: options.map(o => {
      return {
        ...o,
        footer: <Footer section={o.label} />,
      };
    }),
    value: optionsTwo[1],
    selectedGroupIndex: 1,
    setSelectedGroupIndex: () => {},
    selectedOptionFirst: true,
  },
};

export const NoValue: Story = {
  args: {
    options,
    selectedGroupIndex: 0,
    setSelectedGroupIndex: () => {},
  },
};

function mapLongerLabels(o: Array<Option<string>>) {
  return o.map(option => {
    return {
      ...option,
      label: `${option.label}-`.repeat(10),
    };
  });
}

export const LongerLabels: Story = {
  args: {
    options: options.map(o => {
      return {
        ...o,
        options: mapLongerLabels(o.options),
      };
    }),
    selectedGroupIndex: 0,
    setSelectedGroupIndex: () => {},
  },
};

export const NoOptions: Story = {
  args: {
    options: noOptions,
    selectedGroupIndex: 0,
    setSelectedGroupIndex: () => {},
  },
};