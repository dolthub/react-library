import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import FormSelect from "../FormSelect";

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
    isClearable: true,
  },
};

export const SelectedFirst: Story = {
  args: {
    label: "Label",
    options,
    val: "two",
    selectedOptionFirst: true,
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

export const BlueRounded: Story = {
  args: {
    label: "Label",
    options,
    blue: true,
    rounded: true,
    isClearable: true,
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

export const HorizontalSmall: Story = {
  args: {
    label: "Label",
    options,
    val: "one",
    horizontal: true,
    small: true,
  },
};

export const ForMobileLight: Story = {
  args: {
    val: "two",
    options,
    forMobile: true,
    light: true,
  },
  parameters: { viewport: { defaultViewport: "iphonex" } },
};

export const ForMobileDark: Story = {
  args: {
    val: "two",
    options,
    forMobile: true,
  },
  parameters: {
    viewport: { defaultViewport: "iphonex" },
    backgrounds: { default: "dark" },
  },
};

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
      { value: "one", label: "One", icon: <Icon icon="🍎" /> },
      { value: "two", label: "Two", icon: <Icon icon="🍌" /> },
      {
        value: "three",
        label: "Three",
        icon: <Icon icon="🍊" />,
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
        icon: <Icon icon="🍎" />,
        details: <Details text="info about one" />,
      },
      {
        value: "two",
        label: "Two",
        icon: <Icon icon="🍌" />,
        details: <Details text="info about two" />,
      },
      {
        value: "three",
        label: "Three",
        icon: <Icon icon="🍊" />,
        details: <Details text="info about three" />,
        isDisabled: true,
      },
    ],
    val: "one",
  },
};

export const WithIconPath: Story = {
  args: {
    label: "Label",
    options: [
      {
        value: "one",
        label: "One",
        iconPath:
          "https://dolthubapi.awsdev.ld-corp.com/profilePictures/u/m2lcqc5kf5324lc26td2hs0aioat0m2pbk26igfkklf68",
      },
      {
        value: "two",
        label: "Two",
        iconPath:
          "https://dolthubapi.awsdev.ld-corp.com/profilePictures/u/m2lcqc5kf5324lc26td2hs0aioat0m2pbk26igfkklf68",
      },
      {
        value: "three",
        label: "Three",
        iconPath:
          "https://dolthubapi.awsdev.ld-corp.com/profilePictures/u/m2lcqc5kf5324lc26td2hs0aioat0m2pbk26igfkklf68",
        isDisabled: true,
      },
    ],
    val: "one",
  },
};
