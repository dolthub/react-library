import { render, screen } from "@testing-library/react";
import React from "react";
import SmallLoader from "../SmallLoader";

describe("test SmallLoader", () => {
  it("does not render child if loading", () => {
    render(<SmallLoader loaded={false}>Loading...</SmallLoader>);
    const el = screen.queryByText("Loading...");
    expect(el).not.toBeInTheDocument();
  });
  it("does render child if not loading", () => {
    render(<SmallLoader loaded>Loading...</SmallLoader>);
    const el = screen.getByText("Loading...");
    expect(el).toBeVisible();
  });
});

describe("test SmallLoader.WithText", () => {
  it("does render text if loading", () => {
    render(<SmallLoader.WithText loaded={false} text="Loading..." />);
    const el = screen.getByText("Loading...");
    expect(el).toBeVisible();
  });
  it("does not render text if not loading", () => {
    render(<SmallLoader.WithText loaded text="Loading..." />);
    const el = screen.queryByText("Loading...");
    expect(el).not.toBeInTheDocument();
  });
});
