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
