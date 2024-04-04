import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import FormInput from "../FormInput";
import FormModal from "../Modal/ForForm";

const meta: Meta<typeof FormModal> = {
  title: "FormModal",
  component: FormModal,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof FormModal>;

export const Basic: Story = {
  args: {
    title: "Form Modal",
    isOpen: true,
    onRequestClose: () => {},
    children: (
      <p>
        <FormInput light label="Input" placeholder="placeholder" />
      </p>
    ),
    btnText: "Submit",
  },
};
