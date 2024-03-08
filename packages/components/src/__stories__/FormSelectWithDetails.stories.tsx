import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import FormSelect from "../FormSelect";

const meta: Meta<typeof FormSelect.WithDetails> = {
  title: "FormSelect.WithDetails",
  component: FormSelect.WithDetails,
  tags: ["autodocs"],
  decorators: [story => <div className="max-w-[300px] mb-32">{story()}</div>],
};

export default meta;

type Story = StoryObj<typeof FormSelect.WithDetails>;

function Details({ text }: { text: string }) {
  return (
    <div className="text-gray-500 text-xs mt-1 mb-1">
      <span>{text}</span>
    </div>
  );
}

export const WithDetails: Story = {
  args: {
    label: "Label",
    options: [
      {
        value: "one",
        label: "One",
        details: <Details text="info about one" />,
      },
      {
        value: "two",
        label: "Two",
        details: <Details text="info about two" />,
      },
      {
        value: "three",
        label: "Three",
        isDisabled: true,
        details: <Details text="info about three but it's disabled" />,
      },
    ],
    val: "one",
  },
};

function Icon({ icon }: { icon: string }) {
  return <span className="mr-3">{icon}</span>;
}

export const WithIcons: Story = {
  args: {
    label: "Label",
    options: [
      { value: "one", label: "One", icon: <Icon icon={"🍎"} /> },
      { value: "two", label: "Two", icon: <Icon icon={"🍌"} /> },
      {
        value: "three",
        label: "Three",
        icon: <Icon icon={"🍊"} />,
        isDisabled: true,
      },
    ],
    val: "one",
  },
};

export const WithIconsAndDetails: Story = {
  args: {
    label: "Label",
    options: [
      {
        value: "one",
        label: "One",
        icon: <Icon icon={"🍎"} />,
        details: <Details text="info about one" />,
      },
      {
        value: "two",
        label: "Two",
        icon: <Icon icon={"🍌"} />,
        details: <Details text="info about two" />,
      },
      {
        value: "three",
        label: "Three",
        icon: <Icon icon={"🍊"} />,
        details: <Details text="info about three" />,
        isDisabled: true,
      },
    ],
    val: "one",
  },
};
