import { FaDiscord } from "@react-icons/all-files/fa/FaDiscord";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Button from "../Button";
import Footer from "../Footer";

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
        <img
          src="data:image/svg+xml,%3Csvg width='112' height='21' viewBox='0 0 112 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.9442 2.64868V16.7489C10.9425 17.089 10.809 17.4148 10.5728 17.6555C10.3365 17.8962 10.0165 18.0323 9.68214 18.0343H4.26964C3.93401 18.0343 3.61203 17.8991 3.37411 17.6582C3.13618 17.4173 3.00168 17.0904 3 16.7489V9.08768C3.00168 8.74616 3.13618 8.41921 3.37411 8.17832C3.61203 7.93743 3.93401 7.8022 4.26964 7.80221H8.5255' stroke='%2329E3C1' stroke-width='4.59866' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M57.2324 18.0344H53.2305' stroke='%2329E3C1' stroke-width='4.59866' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M57.1331 7.9082H49.1953' stroke='%2329E3C1' stroke-width='4.59866' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M53.25 2.6499V18.0343' stroke='%2329E3C1' stroke-width='4.59866' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M26.7109 2.88H21.9066C21.0413 2.88 20.3398 3.59377 20.3398 4.47425V16.3652C20.3398 17.2457 21.0413 17.9595 21.9066 17.9595H26.7109C27.5762 17.9595 28.2777 17.2457 28.2777 16.3652V4.47425C28.2777 3.59377 27.5762 2.88 26.7109 2.88Z' stroke='%2329E3C1' stroke-width='4.59866' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M43.8962 18.0344H36.5703' stroke='%2329E3C1' stroke-width='4.59866' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M40.5391 2.6499V18.0343' stroke='%2329E3C1' stroke-width='4.59866' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M40.3723 2.63196H36.3438' stroke='%2329E3C1' stroke-width='4.59866' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M74.7366 18.0345V9.08784C74.735 8.74766 74.6015 8.42187 74.3652 8.1812C74.1289 7.94053 73.8089 7.80441 73.4746 7.80237H69.2188' stroke='%2329E3C1' stroke-width='4.59866' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M103.889 7.80237H108.145C108.479 7.80441 108.799 7.94053 109.035 8.1812C109.272 8.42187 109.405 8.74766 109.407 9.08784V16.5811C109.407 16.9663 109.256 17.3358 108.989 17.6083C108.721 17.8809 108.358 18.0341 107.98 18.0345H101.422' stroke='%2329E3C1' stroke-width='4.59866' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M66.7969 2.6499V18.0343' stroke='%2329E3C1' stroke-width='4.59866' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M84.1328 2.88V16.3639C84.1318 16.5742 84.1717 16.7826 84.2503 16.9771C84.3288 17.1716 84.4444 17.3483 84.5904 17.4972C84.7364 17.646 84.91 17.7639 85.101 17.8441C85.292 17.9244 85.4967 17.9653 85.7034 17.9646H90.5077C90.9232 17.9646 91.3217 17.7967 91.6156 17.4977C91.9094 17.1987 92.0745 16.7932 92.0745 16.3704V2.88' stroke='%2329E3C1' stroke-width='4.59866' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M101.422 2.6499V18.0343' stroke='%2329E3C1' stroke-width='4.59866' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A"
          alt="DOLTHUB"
        />
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
        <img
          alt="doltlab"
          src="data:image/png;base64,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"
        />
      </a>
    ),
    poweredBy: "DoltLab doltlab-v2.1.0",
  },
  parameters: {
    backgrounds: { default: "lightish" },
  },
};

export const WithBottomButton: Story = {
  args: {
    ...Default.args,
    bottomButton: <Button>Start Download</Button>,
    version: "doltlab-v2.1.0",
  },
};
