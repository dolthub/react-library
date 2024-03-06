import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import SmallLoader from "../SmallLoader";

const meta: Meta<typeof SmallLoader.WithText> = {
  title: "SmallLoader.WithText",
  component: SmallLoader.WithText,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SmallLoader.WithText>;

export const NotLoadedNoChild: Story = {
  args: {
    loaded: false,
    text: "Loading...",
  },
};

export const NotLoadedWithChild: Story = {
  args: {
    loaded: false,
    children: <span>Loaded</span>,
    text: "Loading...",
  },
};

export const LoadedWithChild: Story = {
  args: {
    loaded: true,
    children: <span>Loaded</span>,
    text: "Loading...",
  },
};

export const LoadedNoChild: Story = {
  args: {
    loaded: true,
    text: "Loading...",
  },
};

export const NotLoadedWithStyles: Story = {
  args: {
    loaded: false,
    text: "Loading...",
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
