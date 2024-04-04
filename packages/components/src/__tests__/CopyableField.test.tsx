import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import CopyableField from "../CopyableField";

describe("CopyableField", () => {
  it("renders correctly", () => {
    render(<CopyableField value="Test Value" label="My Value" />);
    expect(screen.getByText("Test Value")).toBeInTheDocument();
    expect(screen.getByText("My Value:")).toBeInTheDocument();
  });

  it("hides value when hideValue is true", () => {
    render(<CopyableField value="Test Value" hideValue />);
    expect(screen.queryByText("Test Value")).not.toBeInTheDocument();
  });

  it("shows custom value when value is hidden", () => {
    render(
      <CopyableField
        value="Test Value"
        hideValue
        valueForHidden="Hidden Value"
      />,
    );
    expect(screen.getByText("Hidden Value")).toBeInTheDocument();
  });

  it('changes value to "Copied to clipboard" on copy', async () => {
    render(<CopyableField value="Test Value" />);

    await act(async () => {
      fireEvent.click(screen.getByLabelText("copy value"));
    });

    await screen.findByText("Copied to clipboard");
  });

  it("renders children when provided", () => {
    render(
      <CopyableField value="Test Value">
        <div>Child Element</div>
      </CopyableField>,
    );
    expect(screen.getByText("Child Element")).toBeInTheDocument();
  });
});
