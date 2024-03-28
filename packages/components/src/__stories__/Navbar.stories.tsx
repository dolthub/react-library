import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import DesktopNavbar from "../Navbar/ForDesktop";

const meta: Meta<typeof DesktopNavbar> = {
  title: "DesktopNavbar",
  component: DesktopNavbar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DesktopNavbar>;

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
        <a>Profile</a>
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

export const Dark: Story = {
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
