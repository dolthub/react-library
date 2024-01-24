import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Button from "../Button";
import ButtonsNoError from "../ButtonsNoError";
import css from "./index.module.css";

function setup(jsx: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe("test ButtonsNoError", () => {
  it("renders buttons without error", async () => {
    const onCancel = jest.fn();
    const onClick = jest.fn();
    const { user } = setup(
      <ButtonsNoError onCancel={onCancel} className="class-name">
        <button onClick={onClick} type="button">
          Test Button
        </button>
      </ButtonsNoError>,
    );

    const container = screen.getByLabelText("buttons-no-error");
    expect(container).toBeVisible();
    expect(container).toHaveClass("class-name");

    const cancelButton = screen.getByText("cancel");
    expect(cancelButton).toBeVisible();
    expect(onCancel).not.toHaveBeenCalled();
    await user.click(cancelButton);
    expect(onCancel).toHaveBeenCalled();

    const testButton = screen.getByText("Test Button");
    expect(testButton).toBeVisible();
    expect(onClick).not.toHaveBeenCalled();
    await user.click(testButton);
    expect(onClick).toHaveBeenCalled();
  });

  it("renders buttons aligned left", () => {
    render(
      <ButtonsNoError onCancel={jest.fn()} left>
        <button type="button">Test Button</button>
      </ButtonsNoError>,
    );

    const buttonGroup = screen.getByLabelText("button-group");
    expect(buttonGroup).toBeVisible();
    expect(buttonGroup).toHaveClass(css.left);

    expect(screen.getByText("cancel")).toBeVisible();
    expect(screen.getByText("Test Button")).toBeVisible();
  });

  it("renders with data-cy attribute", () => {
    render(
      <ButtonsNoError data-cy="test-cy" onCancel={jest.fn()} left>
        <Button>Test Button</Button>
      </ButtonsNoError>,
    );

    const buttonGroup = screen.getByLabelText("buttons-no-error");
    expect(buttonGroup).toHaveAttribute("data-cy", "test-cy");
  });
});
