import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Loader from "../Loader";

const meta: Meta<typeof Loader> = {
  title: "Loader",
  component: Loader,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const NotLoadedNoChild: Story = {
  args: {
    loaded: false,
  },
};

export const NotLoadedWithChild: Story = {
  args: {
    loaded: false,
    children: <span>Loaded</span>,
  },
};

export const LoadedWithChild: Story = {
  args: {
    loaded: true,
    children: <span>Loaded</span>,
  },
};

export const LoadedNoChild: Story = {
  args: {
    loaded: true,
  },
};

export const NotLoadedWithStyles: Story = {
  args: {
    loaded: false,
    options: {
      color: "red",
      lines: 4,
      radius: 10,
      shadow: true,
      speed: 0.5,
      opacity: 0.2,
    },
  },
};

// Two separate components fetching API results at the same time each render
// their own fixed, viewport-centered Loader, so the spinners overlap in the
// middle of the page. Distinct colors/sizes here just make both visible.
export const TwoAtOnce: Story = {
  render: () => (
    <>
      <Loader loaded={false} options={{ color: "#0969da" }} />
      <Loader loaded={false} options={{ color: "#cf222e", radius: 20 }} />
    </>
  ),
};
