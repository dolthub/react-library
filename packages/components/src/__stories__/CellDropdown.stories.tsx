import type { Meta, StoryObj } from "@storybook/react";
import cx from "classnames";
import React from "react";
import CellDropdown from "../CellDropdown";

const meta: Meta<typeof CellDropdown> = {
  title: "CellDropdown",
  component: CellDropdown,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CellDropdown>;

const cellClassName =
  "align-top relative min-w-[130px] pr-10 pl-2 border-b border-ld-lightgrey  text-primary font-mono leading-8 text-sm";
const buttonClassName = "absolute bg-white right-2 top-[0.35rem]";

const Cell = (props: { children: React.ReactNode; className?: string }) => (
  <td className={cx(cellClassName, props.className)}>{props.children}</td>
);

const HeadCell = (props: { children: React.ReactNode; className?: string }) => (
  <th className={cx(cellClassName, props.className)}>{props.children}</th>
);

const CellWrapper = ({ children }: { children: React.ReactNode }) => (
  <table>
    <thead>
      <tr>
        <HeadCell>Header 1</HeadCell>
        <HeadCell>Header 2</HeadCell>
      </tr>
    </thead>
    <tbody>
      <tr>
        <Cell className={"bg-ld-lightgrey"}>
          <span>Cell 1</span>
          {children}
        </Cell>
        <Cell>Cell 2</Cell>
      </tr>
      <tr>
        <Cell>Cell 1</Cell>
        <Cell>Cell 2</Cell>
      </tr>
    </tbody>
  </table>
);

const HeadCellWrapper = ({ children }: { children: React.ReactNode }) => (
  <table>
    <thead>
      <tr>
        <HeadCell className={"bg-ld-lightgrey"}>Header 1{children}</HeadCell>
        <HeadCell>Header 2</HeadCell>
      </tr>
    </thead>
    <tbody>
      <tr>
        <Cell>Cell 1</Cell>
        <Cell>Cell 2</Cell>
      </tr>
      <tr>
        <Cell>Cell 1</Cell>
        <Cell>Cell 2</Cell>
      </tr>
    </tbody>
  </table>
);

const RowWrapper = ({ children }: { children: React.ReactNode }) => (
  <table>
    <thead>
      <tr>
        <th />
        <HeadCell>Header 1</HeadCell>
        <HeadCell>Header 2</HeadCell>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{children}</td>
        <Cell>Cell 1</Cell>
        <Cell>Cell 2</Cell>
      </tr>
      <tr>
        <td />
        <Cell>Cell 1</Cell>
        <Cell>Cell 2</Cell>
      </tr>
    </tbody>
  </table>
);

const children = (
  <ul>
    <li>First item</li>
    <li>Second item</li>
  </ul>
);

export const NoShow: Story = {
  args: {
    children,
    showDropdown: false,
    setShowDropdown: () => {},
    buttonClassName,
  },
  decorators: [story => <CellWrapper>{story()}</CellWrapper>],
};

export const ShowCell: Story = {
  args: {
    children,
    showDropdown: true,
    setShowDropdown: () => {},
    buttonClassName,
  },
  decorators: [story => <CellWrapper>{story()}</CellWrapper>],
};

export const ShowHeadCell: Story = {
  args: {
    children,
    showDropdown: true,
    setShowDropdown: () => {},
    buttonClassName,
  },
  decorators: [story => <HeadCellWrapper>{story()}</HeadCellWrapper>],
};

export const ShowPadding: Story = {
  args: {
    children,
    showDropdown: true,
    setShowDropdown: () => {},
    padding: true,
    buttonClassName,
  },
  decorators: [story => <CellWrapper>{story()}</CellWrapper>],
};

export const ShowRow: Story = {
  args: {
    children,
    showDropdown: true,
    setShowDropdown: () => {},
    forRow: true,
    buttonClassName: "text-ld-darkergrey mx-2 text-xl flex",
  },
  decorators: [story => <RowWrapper>{story()}</RowWrapper>],
};
