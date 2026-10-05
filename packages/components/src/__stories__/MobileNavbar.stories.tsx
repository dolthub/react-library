import type { Meta, StoryObj } from "@storybook/react";
import { AiFillDiscord } from "react-icons/ai";
import { FaGithub, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import React from "react";
import { expect, userEvent, within } from "storybook/test";
import Navbar from "../Navbar";
import MobileNavDropdown from "../Navbar/ForMobile/NavDropdown";
import { dolthubLogo } from "./images";

// Each story mirrors a real consumer's link shape, so Chromatic catches
// regressions to apps this PR does not touch.
const meta: Meta<typeof Navbar> = {
  title: "MobileNavbar",
  component: Navbar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  globals: { viewport: { value: "iphonex" } },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

const logo = <img src={dolthubLogo} alt="DoltHub" />;

// The menu only mounts once the hamburger is clicked.
async function openMobileMenu(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByLabelText("open mobile navbar menu"));
  await expect(canvas.getByLabelText("mobile nav menu")).toBeInTheDocument();
}

const socialLinks = (
  <>
    <a href="#linkedin" aria-label="linkedin">
      <FaLinkedinIn />
    </a>
    <a href="#github" aria-label="github">
      <FaGithub />
    </a>
    <a href="#discord" aria-label="discord">
      <AiFillDiscord />
    </a>
    <a href="#youtube" aria-label="youtube">
      <FaYoutube />
    </a>
  </>
);

const signInAction = (
  <button type="button" data-cy="mobile-navbar-signin">
    Sign in
  </button>
);

// EXISTING CONSUMER SHAPES

const dolthubArgs = {
  logo,
  leftLinks: (
    <>
      <a href="#databases">Databases</a>
      <a href="#pricing">Pricing</a>
      <a href="#documentation">Documentation</a>
      <a href="#blog">Blog</a>
    </>
  ),
  rightLinks: <a href="#signin">Sign In</a>,
  rightLinksMobile: (
    <>
      <a href="#organizations">My Organizations</a>
      <a href="#settings">Settings</a>
      <a href="#signin">Sign In</a>
    </>
  ),
  mobileBottomLinks: socialLinks,
  logoLeft: true,
};

export const Closed: Story = { args: dolthubArgs };

export const OpenDoltHub: Story = {
  args: dolthubArgs,
  play: async ({ canvasElement }) => openMobileMenu(canvasElement),
};

export const OpenDoltLab: Story = {
  args: {
    logo,
    bgColor: "bg-space-700",
    logoLeft: true,
    leftLinks: (
      <>
        <a href="#documentation">Documentation</a>
        <a href="#blog">Blog</a>
        <a href="#demo">Demo</a>
      </>
    ),
    rightLinks: <a href="#discord">Discord</a>,
  },
  play: async ({ canvasElement }) => openMobileMenu(canvasElement),
};

export const OpenHosted: Story = {
  args: {
    logo,
    bgColor: "bg-ocean-400",
    large: true,
    leftLinks: (
      <>
        <a href="#deployments">Deployments</a>
        <a href="#pricing">Pricing</a>
        <a href="#documentation">Documentation</a>
      </>
    ),
    rightLinks: <a href="#signin">Sign In</a>,
    rightLinksMobile: (
      <>
        <a href="#discord">Discord</a>
        <a href="#github">GitHub</a>
        <a href="#settings">Settings</a>
      </>
    ),
  },
  globals: { theme: "hosted", viewport: { value: "iphonex" } },
  play: async ({ canvasElement }) => openMobileMenu(canvasElement),
};

// Workbench passes an empty fragment for `leftLinks`.
export const OpenWorkbench: Story = {
  args: {
    logo,
    bgColor: "bg-transparent",
    logoLeft: true,
    leftLinks: <></>,
    rightLinks: (
      <>
        <a href="#blog">Blog</a>
        <a href="#discord">Discord</a>
        <a href="#github">GitHub</a>
      </>
    ),
  },
  globals: { theme: "workbench", viewport: { value: "iphonex" } },
  play: async ({ canvasElement }) => openMobileMenu(canvasElement),
};

// NEW BEHAVIOUR

// More links than fit on a phone.
export const OpenScrollable: Story = {
  args: {
    ...dolthubArgs,
    leftLinks: (
      <>
        {[
          "Databases",
          "Pricing",
          "Documentation",
          "Blog",
          "Public Databases",
          "Dolt",
          "DoltgreSQL",
          "DoltLite",
          "DoltHub",
          "DoltLab",
          "Dolt Workbench",
          "Hosted Dolt",
        ].map(name => (
          <a href={`#${name.toLowerCase().replace(/\s/g, "-")}`} key={name}>
            {name}
          </a>
        ))}
      </>
    ),
  },
  play: async ({ canvasElement }) => openMobileMenu(canvasElement),
};

const products = [
  { name: "Dolt", href: "#dolt" },
  { name: "DoltgreSQL", href: "#doltgresql" },
  { name: "DoltLite", href: "#doltlite" },
  { name: "DoltHub", href: "#dolthub" },
  { name: "DoltLab", href: "#doltlab" },
  { name: "Dolt Workbench", href: "#dolt-workbench" },
];

const withDropdown = (defaultOpen: boolean) => (
  <>
    <MobileNavDropdown
      label="Products"
      defaultOpen={defaultOpen}
      data-cy="mobile-navbar-products"
    >
      {products.map(p => (
        <a
          href={p.href}
          key={p.name}
          className="block py-2 pl-10 pr-6 text-white/80"
        >
          {p.name}
        </a>
      ))}
    </MobileNavDropdown>
    <a href="#pricing">Pricing</a>
    <a href="#documentation">Docs</a>
    <a href="#public-databases">Public Databases</a>
    <a href="#blog">Blog</a>
  </>
);

export const OpenWithDropdown: Story = {
  args: {
    ...dolthubArgs,
    leftLinksMobile: withDropdown(false),
    rightLinksMobile: <></>,
    mobileActions: signInAction,
  },
  play: async ({ canvasElement }) => openMobileMenu(canvasElement),
};

export const OpenWithSignIn: Story = {
  args: {
    ...dolthubArgs,
    rightLinksMobile: (
      <>
        <a href="#organizations">My Organizations</a>
        <a href="#settings">Settings</a>
      </>
    ),
    mobileActions: signInAction,
  },
  play: async ({ canvasElement }) => openMobileMenu(canvasElement),
};

export const OpenWithDropdownExpanded: Story = {
  args: {
    ...dolthubArgs,
    leftLinksMobile: withDropdown(true),
    rightLinksMobile: <></>,
    mobileActions: signInAction,
  },
  play: async ({ canvasElement }) => openMobileMenu(canvasElement),
};
