import { KeyCodes } from "@dolthub/web-utils";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Button from "../Button";
import CommentForm from "../CommentForm";
import ForMobile from "../CommentForm/ForMobile";
import { setup } from "./testUtils.test";

describe("tests CommentForm", () => {
  it("renders correctly", () => {
    const setComment = jest.fn();
    const onSubmit = jest.fn();
    render(
      <CommentForm
        comment=""
        setComment={setComment}
        onSubmit={onSubmit}
        inputRef={undefined}
        maxCharCount={2048}
        profPic={<img src="" aria-label="username letter" />}
      />,
    );

    // profile icon
    expect(screen.getByLabelText("username letter")).toBeInTheDocument();
    // textbox
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    // char count
    expect(screen.getByText("0/2048")).toBeVisible();
  });

  it("renders for mobile", () => {
    const setComment = jest.fn();
    const onSubmit = jest.fn();
    render(
      <ForMobile
        comment=""
        setComment={setComment}
        onSubmit={onSubmit}
        inputRef={undefined}
        maxCharCount={2048}
        profPic={<img src="" aria-label="username letter" />}
      />,
    );

    // profile icon
    expect(screen.getByLabelText("username letter")).toBeInTheDocument();
    // textbox
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    // char count
    expect(screen.getByText("0/2048")).toBeVisible();
  });

  it("calls the submit function if user presses ctrl + enter", async () => {
    const setComment = jest.fn();
    const onSubmit = jest.fn();
    const { user } = setup(
      <CommentForm
        comment=""
        setComment={setComment}
        onSubmit={onSubmit}
        inputRef={undefined}
      />,
    );

    const input = screen.getByRole("textbox");
    await user.click(input);
    fireEvent.keyDown(input, {
      key: "Enter",
      ctrlKey: true,
      keyCode: KeyCodes.ENTER,
    });
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("calls the submit function if user presses cmd + enter", async () => {
    const setComment = jest.fn();
    const onSubmit = jest.fn();
    const { user } = setup(
      <CommentForm
        comment=""
        setComment={setComment}
        onSubmit={onSubmit}
        inputRef={undefined}
      />,
    );

    const input = screen.getByRole("textbox");
    await user.click(input);
    fireEvent.keyDown(input, {
      key: "Enter",
      metaKey: true,
      keyCode: KeyCodes.ENTER,
    });
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("does not call the submit function if user presses enter", async () => {
    const setComment = jest.fn();
    const onSubmit = jest.fn();
    const { user } = setup(
      <CommentForm
        comment=""
        setComment={setComment}
        onSubmit={onSubmit}
        inputRef={undefined}
      />,
    );

    await user.click(screen.getByRole("textbox"));
    await user.keyboard("{Enter}");
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("calls update comment and submits", async () => {
    const setComment = jest.fn();
    const onSubmit = jest.fn();
    const { user } = setup(
      <CommentForm
        comment=""
        setComment={setComment}
        onSubmit={onSubmit}
        inputRef={undefined}
      >
        <Button type="submit">Submit</Button>
      </CommentForm>,
    );

    const textToType = "Hello, world!";
    await user.type(screen.getByRole("textbox"), textToType);
    expect(setComment).toHaveBeenCalledTimes(textToType.length);

    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
