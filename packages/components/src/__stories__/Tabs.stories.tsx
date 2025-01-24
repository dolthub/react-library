import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "../Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Tabs",
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Tabs>;

function Panel(props: { text: string; idx: number }) {
  return (
    <TabPanel index={props.idx}>
      <div className="my-6 mx-3">{props.text}</div>
    </TabPanel>
  );
}

const tabs = ["Tab 1", "Tab 2"];
const panels = [
  <Panel key="1" text="Content 1 for Tab 1" idx={0} />,
  <Panel key="2" text="Content 2 for Tab 2" idx={1} />,
];

export const Basic: Story = {
  args: {
    initialActiveIndex: 0,
    children: [
      <TabList key="tabList">
        {tabs.map((tab, index) => (
          <Tab key={tab} index={index}>
            {tab}
          </Tab>
        ))}
      </TabList>,
      ...panels,
    ],
  },
};

export const SecondActive: Story = {
  args: {
    initialActiveIndex: 1,
    children: [
      <TabList key="tabList">
        {tabs.map((tab, index) => (
          <Tab key={tab} index={index}>
            {tab}
          </Tab>
        ))}
      </TabList>,
      ...panels,
    ],
  },
};

export const HideLastTab: Story = {
  args: {
    initialActiveIndex: 0,
    children: [
      <TabList key="tabList">
        {tabs.map((tab, index) => (
          <Tab key={tab} index={index}>
            {tab}
          </Tab>
        ))}
        <Tab index={2} hide>
          Tab 3
        </Tab>
      </TabList>,
      ...panels,
    ],
  },
};

export const DisableLastTab: Story = {
  args: {
    initialActiveIndex: 0,
    children: [
      <TabList key="tabList">
        {tabs.map((tab, index) => (
          <Tab key={tab} index={index}>
            {tab}
          </Tab>
        ))}
        <Tab index={2} disabled>
          Tab 3
        </Tab>
      </TabList>,
      ...panels,
    ],
  },
};

export const TabWithLink: Story = {
  args: {
    children: [
      <TabList key="tabList">
        {tabs.map((tab, index) => (
          <Tab key={tab} index={index} renderOnlyChild>
            <a href="#">{tab}</a>
          </Tab>
        ))}
      </TabList>,
      ...panels,
    ],
  },
};

export const SmallDark: Story = {
  args: {
    initialActiveIndex: 0,
    children: [
      <TabList key="tabList">
        {tabs.map((tab, index) => (
          <Tab key={tab} index={index} small dark renderOnlyChild>
            <a className="text-link-1">{tab}</a>
          </Tab>
        ))}
      </TabList>,
      ...panels,
    ],
  },
  name: "Small Dark (Hosted, Workbench)",
};
