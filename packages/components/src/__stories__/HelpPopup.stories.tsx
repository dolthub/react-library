import { IoIosInformation } from "@react-icons/all-files/io/IoIosInformation";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Button from "../Button";
import HelpPopup from "../HelpPopup";

const meta: Meta<typeof HelpPopup> = {
  title: "HelpPopup",
  component: HelpPopup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof HelpPopup>;

export const Basic: Story = {
  args: {
    children: <span>Show me on hover</span>,
  },
};

export const Blue: Story = {
  args: {
    ...Basic.args,
    blue: true,
  },
};

export const DifferentIcon: Story = {
  args: {
    ...Basic.args,
    icon: (
      <Button>
        <IoIosInformation />
      </Button>
    ),
  },
};
