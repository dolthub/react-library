import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import TransparentButtonWithIcon from "../TransparentButtonWithIcon";

describe("test TransparentButtonWithIcon", () => {
  const defaultProps = {
    href: "https://example.com",
    "aria-label": "test-button",
    children: "Click Me",
  };

  it("renders correctly with minimal props", () => {
    render(<TransparentButtonWithIcon {...defaultProps} />);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://example.com",
    );
    expect(screen.getByRole("link")).toHaveAttribute(
      "aria-label",
      "test-button",
    );
  });

  it("applies dark mode styles when dark prop is true", () => {
    render(<TransparentButtonWithIcon {...defaultProps} dark />);
    expect(screen.getByLabelText("inner transparent button")).toHaveClass(
      /darkButton/,
    );
    expect(screen.getByText("Click Me")).toHaveClass("darkInner");
  });

  it("renders icon when provided", () => {
    const icon = <svg data-testid="test-icon" />;
    render(<TransparentButtonWithIcon {...defaultProps} icon={icon} />);
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("forwards additional props to ExternalLink", () => {
    render(<TransparentButtonWithIcon {...defaultProps} data-cy="test-link" />);
    expect(screen.getByRole("link")).toHaveAttribute("data-cy", "test-link");
  });
});
