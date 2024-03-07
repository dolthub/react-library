import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import SmallLoader from "../SmallLoader";

const meta: Meta<typeof SmallLoader> = {
  title: "SmallLoader",
  component: SmallLoader,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SmallLoader>;

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
      radius: 4,
      shadow: true,
      speed: 0.5,
      opacity: 0.2,
    },
  },
};
