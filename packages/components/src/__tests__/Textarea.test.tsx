import { render, screen } from "@testing-library/react";
import React from "react";
import Textarea from "../Textarea";
import { setup } from "./testUtils.test";

describe("test Textarea", () => {
  it("renders textarea", async () => {
    const onChange = jest.fn();
    const { user } = setup(
      <Textarea
        rows={4}
        label="Name"
        className="class-name"
        placeholder="Placeholder text"
        onChange={onChange}
      />,
    );

    expect(screen.getByText("Name")).toBeVisible();
    expect(screen.getByLabelText("textarea-container")).toHaveClass(
      "class-name",
    );

    const input = screen.getByPlaceholderText("Placeholder text");
    expect(input).toBeVisible();

    await user.type(input, "new name");
    expect(onChange).toHaveBeenCalled();
    expect(input).toHaveValue("new name");
  });

  it("renders textarea with onChangeString", async () => {
    const onChangeString = jest.fn();
    const { user } = setup(
      <Textarea
        rows={4}
        label="Name"
        className="class-name"
        placeholder="Placeholder text"
        onChangeString={onChangeString}
      />,
    );

    const input = screen.getByPlaceholderText("Placeholder text");
    expect(input).toBeVisible();

    await user.type(input, "new name");
    expect(onChangeString).toHaveBeenCalledWith("new name");
    expect(input).toHaveValue("new name");
  });

  it("renders textarea with value", () => {
    render(
      <Textarea
        rows={4}
        label="Name"
        className="class-name"
        value="This is my text"
        onChange={jest.fn()}
        description="description"
      />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeVisible();
    expect(input).toHaveValue("This is my text");
    expect(input).toHaveAttribute("placeholder", "");
    expect(screen.getByText("description")).toBeVisible();
  });
});
