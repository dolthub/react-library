import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Navbar from "../Navbar";

const meta: Meta<typeof Navbar> = {
  title: "Navbar",
  component: Navbar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Basic: Story = {
  args: {
    logo: (
      <img
        src="https://dolthub.awsdev.ld-corp.com/blog/static/bd834a2859f2246200c1692940ff1409/222b7/dolt-logo-1.png"
        alt="LOGO"
      />
    ),
    leftLinks: (
      <>
        <a>Pricing</a>
        <a>Blog</a>
        <a>Documentation</a>
      </>
    ),
    rightLinks: (
      <>
        <a>
          <FaGithub /> GitHub
        </a>
        <a>Another</a>
      </>
    ),
  },
};

export const Large: Story = {
  args: {
    ...Basic.args,
    large: true,
  },
};

export const TransparentDark: Story = {
  args: {
    ...Basic.args,
    dark: true,
    bgColor: "bg-transparent",
  },
  parameters: {
    backgrounds: { default: "lightish" },
  },
};

export const LogoLeft: Story = {
  args: {
    ...Basic.args,
    logoLeft: true,
  },
};

export const Mobile: Story = {
  args: Basic.args,

  parameters: {
    viewport: { defaultViewport: "iphonex" },
  },
};

export const MobileTransparentDark: Story = {
  args: TransparentDark.args,
  parameters: {
    viewport: { defaultViewport: "iphonex" },
  },
};
