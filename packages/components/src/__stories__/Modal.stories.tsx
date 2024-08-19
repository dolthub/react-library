import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Button from "../Button";
import Modal from "../Modal";

const meta: Meta<typeof Modal> = {
  title: "Modal",
  component: Modal,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Basic: Story = {
  args: {
    title: "Modal",
    isOpen: true,
    onRequestClose: () => {},
    children: <p>Some information about this modal.</p>,
    button: <Button>Button</Button>,
  },
};

export const WithError: Story = {
  args: {
    ...Basic.args,
    err: new Error("An error occurred"),
  },
};

export const WithLongError: Story = {
  args: {
    ...Basic.args,
    err: new Error(
      "An error occurred that is much much longer and should go to the next line",
    ),
  },
};

export const NoButton: Story = {
  args: {
    ...Basic.args,
    button: undefined,
  },
};

export const NoButtonPill: Story = {
  args: {
    ...Basic.args,
    button: undefined,
    buttonPill: true,
  },
};
