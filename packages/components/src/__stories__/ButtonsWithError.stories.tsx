import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Button from "../Button";
import ButtonsWithError from "../ButtonsWithError";

const meta: Meta<typeof ButtonsWithError> = {
  title: "ButtonsWithError",
  component: ButtonsWithError,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ButtonsWithError>;

export const Basic: Story = {
  args: {
    children: <Button>Name</Button>,
    onCancel: undefined,
  },
};

export const WithCancel: Story = {
  args: {
    ...Basic.args,
    onCancel: () => {},
  },
};

export const WithError: Story = {
  args: {
    ...WithCancel.args,
    error: new Error("This is an error"),
  },
};

export const Stacked: Story = {
  args: {
    ...WithError.args,
    stackedButton: true,
  },
  parameters: {
    viewport: { defaultViewport: "iphonex" },
  },
};

export const Left: Story = {
  args: {
    ...WithError.args,
    left: true,
  },
};

export const Right: Story = {
  args: {
    ...WithError.args,
    right: true,
  },
};
