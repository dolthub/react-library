import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Navbar from "../Navbar";
import DiscordButton from "../TransparentButtonWithIcon/ForDiscord";
import GithubButton from "../TransparentButtonWithIcon/ForGithub";

const meta: Meta<typeof Navbar> = {
  title: "Navbar",
  component: Navbar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

const rightLinks = (dark = false) => (
  <>
    <GithubButton href="github.com" githubStarCount={10900} dark={dark} />
    <DiscordButton href="discord.com" dark={dark} />
  </>
);

const leftLinks = (
  <>
    <a>Blog</a>
    <a>Documentation</a>
  </>
);

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
    rightLinks: rightLinks(),
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
    rightLinks: rightLinks(true),
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

export const MobileWithLeftLinks: Story = {
  args: { ...Basic.args, leftLinksMobile: leftLinks },

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
