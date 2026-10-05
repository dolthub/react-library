import type { Meta, StoryObj } from "@storybook/react";
import React, { ReactNode, useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import Navbar from "../Navbar";
import DesktopNavDropdown from "../Navbar/ForDesktop/NavDropdown";
import { dolthubLogo } from "./images";

// The columns and cards below stand in for what the app would pass as
// children; they are DoltHub marketing content, not library UI.
const meta: Meta<typeof Navbar> = {
  title: "DesktopNavDropdown",
  component: Navbar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

// Not in the palette yet.
const navBg = "bg-[#070f25]";

type Product = { name: string; description: string };

function Card({ name, description }: Product) {
  return (
    <a
      href={`#${name.toLowerCase().replace(/\s/g, "-")}`}
      className="flex w-[327px] gap-3.5 rounded-lg border border-white/10 bg-ocean-800 p-5"
    >
      <span className="size-10 shrink-0 rounded bg-white/10" aria-hidden />
      <span className="flex flex-col gap-1">
        <span className="text-base font-semibold text-white">{name}</span>
        <span className="text-[13px] text-stone-300">{description}</span>
      </span>
    </a>
  );
}

function Column({
  heading,
  products,
}: {
  heading: string;
  products: Product[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm tracking-wide text-stone-300">{heading}</p>
      {products.map(p => (
        <Card key={p.name} {...p} />
      ))}
    </div>
  );
}

const databases: Product[] = [
  { name: "Dolt", description: "MySQL-compatible" },
  { name: "DoltgreSQL", description: "PostgreSQL-compatible" },
  { name: "DoltLite", description: "SQLite-compatible" },
];

const platforms: Product[] = [
  { name: "DoltHub", description: "Collaborate with forks, clones, and PRs" },
  { name: "DoltLab", description: "DoltHub on your machine" },
  {
    name: "Dolt Workbench",
    description: "A desktop workbench with agent mode",
  },
];

const productsMenu = (defaultOpen: boolean) => (
  <DesktopNavDropdown
    label="Products"
    defaultOpen={defaultOpen}
    panelClassName={navBg}
    data-cy="navbar-products"
  >
    <div className="flex gap-16 px-20 py-8">
      <Column heading="VERSION-CONTROLLED DATABASES" products={databases} />
      <Column heading="PLATFORMS & TOOLS" products={platforms} />
      <div className="border-l border-white/10 pl-16">
        <p className="mb-4 text-sm tracking-wide text-stone-300">HOSTING</p>
        <a
          href="#hosted"
          className="flex w-[327px] flex-col overflow-hidden rounded-lg border border-white/10 bg-ocean-800"
        >
          <span className="flex h-[140px] items-center justify-center bg-space-700 text-lg font-black tracking-widest text-white">
            HOSTED DOLT
          </span>
          <span className="flex flex-col gap-3 p-5">
            <span className="text-base font-semibold text-white">
              Hosted Dolt
            </span>
            <span className="text-[13px] text-stone-300">
              Fully managed version-controlled databases in the cloud. We handle
              operations, scaling, and backups.
            </span>
            <span className="text-[13px] font-semibold text-sky-400">
              Launch instance
            </span>
          </span>
        </a>
      </div>
    </div>
  </DesktopNavDropdown>
);

const docsLinks = ["Dolt", "DoltgreSQL", "DoltLab"];

type DocsMenuProps = Partial<React.ComponentProps<typeof DesktopNavDropdown>>;

// A small panel anchored to its trigger, like the Docs menu.
const docsMenu = (props: DocsMenuProps) => (
  <DesktopNavDropdown
    label="Docs"
    panelClassName={`w-[233px] ${navBg}`}
    data-cy="navbar-docs"
    {...props}
  >
    <div className="flex flex-col gap-1 px-3 py-4">
      {docsLinks.map(name => (
        <a
          key={name}
          href={`#${name.toLowerCase()}`}
          className="rounded-md px-2 py-2 hover:bg-white/10"
        >
          {name}
        </a>
      ))}
    </div>
  </DesktopNavDropdown>
);

function navArgs(products: ReactNode, docs: ReactNode) {
  return {
    logo: <img src={dolthubLogo} alt="DoltHub" />,
    bgColor: navBg,
    logoLeft: true,
    large: true,
    leftLinks: (
      <>
        {products}
        <a href="#pricing">Pricing</a>
        {docs}
        <a href="#blog">Blog</a>
      </>
    ),
    rightLinks: <a href="#signin">Sign in</a>,
  };
}

function args(defaultOpen: boolean) {
  return navArgs(productsMenu(defaultOpen), <a href="#docs">Docs</a>);
}

// A tall hero so the scrim has something to dim.
function withHero(story: React.ComponentType) {
  const StoryComponent = story;
  return (
    <div>
      <StoryComponent />
      <div className="flex h-[600px] flex-col justify-center bg-gradient-to-b from-[#070f25] to-[#050b30] px-32">
        <p className="text-sm font-semibold tracking-widest text-sky-400">
          AGENTS NEED BRANCHES
        </p>
        <p className="max-w-xl text-6xl font-semibold text-white">
          Dolt is the Database for Agents
        </p>
      </div>
    </div>
  );
}

export const Closed: Story = {
  args: args(false),
  decorators: [withHero],
};

export const Open: Story = {
  args: args(true),
  decorators: [withHero],
};

export const OpenedByClick: Story = {
  args: args(false),
  decorators: [withHero],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /products/i }));
    await expect(
      canvas.getByLabelText("nav dropdown panel"),
    ).toBeInTheDocument();
  },
};

// `align`: "left" and "right" anchor the panel to the trigger instead of
// spanning the page.
export const AlignLeft: Story = {
  args: navArgs(
    productsMenu(false),
    docsMenu({ align: "left", defaultOpen: true }),
  ),
  decorators: [withHero],
};

export const AlignRight: Story = {
  args: navArgs(
    productsMenu(false),
    docsMenu({ align: "right", defaultOpen: true }),
  ),
  decorators: [withHero],
};

export const HideCaret: Story = {
  args: navArgs(
    productsMenu(false),
    docsMenu({ align: "left", hideCaret: true }),
  ),
  decorators: [withHero],
};

export const UnderlineOnOpen: Story = {
  args: navArgs(
    productsMenu(false),
    docsMenu({ align: "left", underlineOnOpen: true, defaultOpen: true }),
  ),
  decorators: [withHero],
};

export const OpenOnHover: Story = {
  args: navArgs(
    productsMenu(false),
    docsMenu({ align: "left", openOnHover: true }),
  ),
  decorators: [withHero],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByRole("button", { name: /docs/i }));
    await expect(
      await canvas.findByLabelText("nav dropdown panel"),
    ).toBeInTheDocument();
  },
};

// `className` wraps the whole item; `triggerClassName` styles the button.
export const CustomClassNames: Story = {
  args: navArgs(
    productsMenu(false),
    docsMenu({
      align: "left",
      defaultOpen: true,
      className: "rounded bg-white/5 px-2",
      // The navbar sets link color and weight, so show one it doesn't.
      triggerClassName: "uppercase",
    }),
  ),
  decorators: [withHero],
};

function ControlledDocsMenu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {docsMenu({ align: "left", isOpen: open, setIsOpen: setOpen })}
      <span className="text-sm text-stone-300" data-cy="docs-open-state">
        {open ? "open" : "closed"}
      </span>
    </>
  );
}

// `isOpen`/`setIsOpen` let the parent own the open state.
export const Controlled: Story = {
  args: navArgs(productsMenu(false), <ControlledDocsMenu />),
  decorators: [withHero],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("closed")).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: /docs/i }));
    await expect(canvas.getByText("open")).toBeInTheDocument();
    await expect(
      canvas.getByLabelText("nav dropdown panel"),
    ).toBeInTheDocument();
  },
};
