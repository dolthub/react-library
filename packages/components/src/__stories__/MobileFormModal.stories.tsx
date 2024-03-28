import { FaDiscord } from "@react-icons/all-files/fa/FaDiscord";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Button from "../Button";
import ForMobile from "../CommentForm/ForMobile";
import MobileFormModal from "../MobileFormModal";
import Navbar from "../Navbar";

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
  <Navbar
    logo={
      <img
        src="https://dolthub.awsdev.ld-corp.com/blog/static/bd834a2859f2246200c1692940ff1409/222b7/dolt-logo-1.png"
        alt="LOGO"
      />
    }
    mobileBottomLinks={
      <>
        <a>
          <FaGithub />
        </a>
        <a>
          <FaDiscord />
        </a>
      </>
    }
  >
    <a>Pricing</a>
    <a>Blog</a>
    <a>Documentation</a>
    <Button.Outlined>Sign out</Button.Outlined>
  </Navbar>
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
