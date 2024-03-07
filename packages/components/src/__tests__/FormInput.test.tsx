import { render, screen } from "@testing-library/react";
import React from "react";
import FormInput from "../FormInput";
import { setup } from "./testUtils.test";

describe("test FormInput", () => {
  it("renders form input", async () => {
    const onChange = jest.fn();
    const { user } = setup(
      <FormInput
        label="Name"
        className="class-name"
        placeholder="Placeholder text"
        onChange={onChange}
      />,
    );

    expect(screen.getByText("Name")).toBeVisible();
    expect(screen.getByLabelText("form-input-container")).toHaveClass(
      "class-name",
    );

    const input = screen.getByPlaceholderText("Placeholder text");
    expect(input).toBeVisible();
    expect(input).toHaveAttribute("type", "text");

    await user.type(input, "new name");
    expect(onChange).toHaveBeenCalled();
    expect(input).toHaveValue("new name");
  });

  it("renders form input with onChangeString", async () => {
    const onChangeString = jest.fn();
    const { user } = setup(
      <FormInput
        label="Name"
        className="class-name"
        placeholder="Placeholder text"
        onChangeString={onChangeString}
      />,
    );

    const input = screen.getByPlaceholderText("Placeholder text");
    expect(input).toBeVisible();
    expect(input).toHaveAttribute("type", "text");

    await user.type(input, "new name");
    expect(onChangeString).toHaveBeenCalledWith("new name");
    expect(input).toHaveValue("new name");
  });

  it("renders form input with value and description", () => {
    render(
      <FormInput
        label="Name"
        className="class-name"
        value="email@email.com"
        type="email"
        description="description"
      />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeVisible();
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveValue("email@email.com");
    expect(input).toHaveAttribute("placeholder", "");

    expect(screen.getByText("description")).toBeVisible();
  });
});
