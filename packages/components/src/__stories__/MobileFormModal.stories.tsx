import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Button from "../Button";
import ForMobile from "../CommentForm/ForMobile";
import MobileFormModal from "../MobileFormModal";

const meta: Meta<typeof MobileFormModal> = {
  title: "MobileFormModal",
  component: MobileFormModal,
  tags: ["autodocs"],
  parameters: {
    viewport: { defaultViewport: "iphonex" },
    backgrounds: { default: "lightish" },
  },
};

export default meta;

type Story = StoryObj<typeof MobileFormModal>;

const Nav = (
  <div className="w-full bg-ld-darkerblue text-white py-1 text-center">Nav</div>
);

const Form = (
  <ForMobile
    comment=""
    setComment={() => null}
    onSubmit={async () => {}}
    label="Description"
  >
    <Button className="w-full mt-6">Submit</Button>
  </ForMobile>
);

export const Basic: Story = {
  args: {
    backToPage: "issues",
    children: Form,
  },
};

export const WithNav: Story = {
  args: {
    backToPage: "issues",
    nav: Nav,
    children: Form,
  },
};

export const WithTitle: Story = {
  args: {
    backToPage: "issues",
    nav: Nav,
    formTitle: "New Issue",
    children: Form,
  },
};
