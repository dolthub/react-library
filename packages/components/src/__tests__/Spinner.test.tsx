import { render, screen } from "@testing-library/react";
import React from "react";
import Spinner from "../Spinner";

describe("test Spinner", () => {
  it("renders an accessible progressbar element", () => {
    render(<Spinner />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
  });

  it("renders one bar per line", () => {
    render(<Spinner lines={8} />);
    const spinner = screen.getByRole("progressbar");
    // eslint-disable-next-line testing-library/no-node-access
    expect(spinner.querySelectorAll("span")).toHaveLength(8);
  });

  it("defaults to 12 bars", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("progressbar");
    // eslint-disable-next-line testing-library/no-node-access
    expect(spinner.querySelectorAll("span")).toHaveLength(12);
  });
});
