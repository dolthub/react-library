import { FaDiscord } from "@react-icons/all-files/fa/FaDiscord";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Footer from "../Footer";
import { dolthubLogo, doltlabEnterpriseLogo, doltlabLogo } from "./images";

const meta: Meta<typeof Footer> = {
  title: "Footer",
  component: Footer,
  tags: ["autodocs"],
  decorators: [
    story => (
      <div className="bg-gradient-to-b to-background-acc-1 from-background-acc-start">
        {story()}
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    logo: (
      <a>
        <img src={dolthubLogo} alt="DOLTHUB" />
      </a>
    ),
    companyName: "DoltHub, Inc",
  },
};

export const WithLinks: Story = {
  args: {
    ...Default.args,
    topLinks: [
      { href: "/about", name: "About" },
      { href: "/pricing", name: "Pricing" },
      { href: "/contact", name: "Contact" },
      { href: "/terms", name: "Terms" },
    ],
    socialLinks: [
      {
        href: "https://twitter.com/dolthub",
        icon: <FaGithub />,
        label: "GitHub",
      },
      {
        href: "https://twitter.com/dolthub",
        icon: <FaDiscord />,
        label: "Discord",
      },
    ],
  },
};

export const WithPoweredByAndVersion: Story = {
  args: {
    ...Default.args,
    logo: (
      <a>
        <img alt="doltlab" src={doltlabEnterpriseLogo} />
      </a>
    ),
    version: "Powered by DoltLab doltlab-v2.1.0 ENTERPRISE",
  },
};

export const WithBottomButton: Story = {
  args: {
    ...Default.args,
    logo: (
      <a>
        <img alt="doltlab" src={doltlabLogo} />
      </a>
    ),
    topLinks: [{ href: "/download", name: "Download DoltLab" }],
    version: "v2.1.0",
  },
};
