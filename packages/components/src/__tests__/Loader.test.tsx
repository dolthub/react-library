import { render, screen } from "@testing-library/react";
import React from "react";
import Loader from "../Loader";

describe("test Loader", () => {
  it("does not render child if loading", () => {
    render(<Loader loaded={false}>Loading...</Loader>);
    const el = screen.queryByText("Loading...");
    expect(el).not.toBeInTheDocument();
  });
  it("does render child if not loading", () => {
    render(<Loader loaded>Loading...</Loader>);
    const el = screen.getByText("Loading...");
    expect(el).toBeVisible();
  });
});
