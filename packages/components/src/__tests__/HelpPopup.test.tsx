import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import HelpPopup from "../HelpPopup";

describe("test HelpPopup", () => {
  it("renders with default icon", () => {
    render(<HelpPopup popupProps={{ on: "click" }}>Help content</HelpPopup>);
    expect(screen.getByLabelText("help")).toBeInTheDocument();
    expect(screen.queryByText("Help content")).not.toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("help"));
    expect(screen.getByText("Help content")).toBeInTheDocument();
  });

  it("renders with custom icon", () => {
    render(
      <HelpPopup popupProps={{ on: "click" }} icon={<span>icon</span>}>
        Help content
      </HelpPopup>,
    );
    expect(screen.getByText("icon")).toBeInTheDocument();
    expect(screen.queryByText("Help content")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("icon"));
    expect(screen.getByText("Help content")).toBeInTheDocument();
  });
});
