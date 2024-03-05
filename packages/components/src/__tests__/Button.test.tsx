import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Button from "../Button";

describe("test Button", () => {
  it("renders a button", () => {
    render(<Button className="class-name">Button Name</Button>);

    const button = screen.getByText("Button Name");
    expect(button).toHaveTextContent("Button Name");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("button");
    expect(button).toHaveClass("class-name");
  });

  it("renders a submit button", () => {
    render(<Button type="submit">Button Name</Button>);

    const button = screen.getByText("Button Name");
    expect(button).toHaveTextContent("Button Name");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveClass("button");
  });

  it("renders a submit button that submits a form", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(
      <form onSubmit={onSubmit} aria-label="form">
        <input name="input" type="text" />
        <Button type="submit">Submit</Button>
      </form>,
    );

    const button = screen.getByText("Submit");
    const form = screen.getByLabelText("form");
    expect(button).toHaveTextContent("Submit");
    expect(form).toBeVisible();

    expect(onSubmit).toHaveBeenCalledTimes(0);
    await user.click(screen.getByRole("textbox"));
    await user.keyboard("{Enter}");
    expect(onSubmit).toHaveBeenCalledTimes(1);

    await user.click(button);
    expect(onSubmit).toHaveBeenCalledTimes(2);
  });

  it("renders a disabled button", () => {
    render(<Button disabled>Button Name</Button>);
    const button = screen.getByText("Button Name");
    expect(button).toHaveTextContent("Button Name");
    expect(button).toBeDisabled();
    expect(button).toHaveClass(/button/);
  });

  it("renders a button that successfully clicks", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Button Name</Button>);

    const button = screen.getByText("Button Name");
    expect(button).toHaveTextContent("Button Name");
    expect(button).toHaveClass(/button/);

    expect(onClick).toHaveBeenCalledTimes(0);
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders a solid button", () => {
    render(<Button>Button Name</Button>);

    const button = screen.getByText("Button Name");
    expect(button).toHaveTextContent("Button Name");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("button");
  });

  it("renders a red button", () => {
    render(<Button red>Button Name</Button>);

    const button = screen.getByText("Button Name");
    expect(button).toHaveTextContent("Button Name");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass(/red/);
  });

  it("renders a solid green button", () => {
    render(<Button green>Button Name</Button>);

    const button = screen.getByText("Button Name");
    expect(button).toHaveTextContent("Button Name");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass(/green/);
    expect(button).toHaveClass(/button/);
  });

  it("renders a link button", () => {
    render(<Button.Link>Button Name</Button.Link>);

    const button = screen.getByText("Button Name");
    expect(button).toHaveTextContent("Button Name");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass(/link/);
  });

  it("renders an underlined button", () => {
    render(<Button.Link underlined>Button Name</Button.Link>);

    const button = screen.getByText("Button Name");
    expect(button).toHaveTextContent("Button Name");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass(/link/);
    expect(button).toHaveClass(/underlined/);
  });

  it("renders a Button Group", () => {
    render(
      <Button.Group className="class-name">
        <Button.Link underlined>Button Name</Button.Link>
        <Button>Another Button</Button>
      </Button.Group>,
    );

    const group = screen.getByLabelText("button-group");
    expect(group).toBeVisible();
    expect(group).toHaveClass("class-name");

    const button1 = screen.getByText("Button Name");
    expect(button1).toHaveTextContent("Button Name");

    const button2 = screen.getByText("Another Button");
    expect(button2).toHaveTextContent("Another Button");
  });
});
