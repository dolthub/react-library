import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
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

export const WithDetails: Story = {
  args: {
    label: "Label",
    options: [
      {
        value: "one",
        label: "One",
        details: <span>info about one</span>,
      },
      {
        value: "two",
        label: "Two",
        details: <span>info about two</span>,
      },
      {
        value: "three",
        label: "Three",
        isDisabled: true,
        details: <span>info about three but it is disabled</span>,
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
        details: <span>info about one</span>,
      },
      {
        value: "two",
        label: "Two",
        icon: <Icon icon="🍌" />,
        details: <span>info about two</span>,
      },
      {
        value: "three",
        label: "Three",
        icon: <Icon icon="🍊" />,
        details: <span>info about three</span>,
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
