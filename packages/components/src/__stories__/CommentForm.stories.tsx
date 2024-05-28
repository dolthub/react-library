import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Button from "../Button";
import CommentForm from "../CommentForm";

const meta: Meta<typeof CommentForm> = {
  title: "CommentForm",
  component: CommentForm,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CommentForm>;

export const Basic: Story = {
  args: {
    comment: "Comment",
  },
};

const ProfPic = (
  <img
    src="https://dolthubapi.awsdev.ld-corp.com/profilePictures/u/m2lcqc5kf5324lc26td2hs0aioat0m2pbk26igfkklf68"
    className="rounded-full"
    alt="pic"
  />
);
export const WithProfPic: Story = {
  args: {
    comment: "Comment",
    profPic: ProfPic,
  },
};

export const WithChildren: Story = {
  args: {
    comment: "Comment",
    profPic: ProfPic,
    children: (
      <Button.Group className="w-full py-2 px-6 bg-stone-50 border-x border-b rounded-b-md flex justify-end">
        <Button>Child 1</Button>
        <Button.Link>Child 2</Button.Link>
      </Button.Group>
    ),
  },
};

function ProfPicWithText() {
  return <div className="flex">{ProfPic} Add comment as user</div>;
}

export const ForMobile: Story = {
  args: {
    comment: "Comment",
    profPic: <ProfPicWithText />,
    children: <Button className="w-full my-2">Child 1</Button>,
    maxCharCount: 1000,
  },
  parameters: {
    viewport: { defaultViewport: "iphonex" },
    backgrounds: { default: "lightish" },
  },
};
