import { render, screen } from "@testing-library/react";
import React from "react";
import ExternalLink from "../ExternalLink";

const href = "https://www.dolthub.com";

describe("test ExternalLink", () => {
  it("renders ExternalLink", () => {
    render(
      <ExternalLink href={href} className="class-name" data-cy="data-cy-tag">
        Click Me
      </ExternalLink>,
    );

    const link = screen.getByText("Click Me");
    expect(link).toBeVisible();
    expect(link).toHaveAttribute("href", href);
    expect(link).toHaveClass("class-name");
    expect(link).toHaveAttribute("data-cy", "data-cy-tag");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
