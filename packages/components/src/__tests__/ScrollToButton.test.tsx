import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import ScrollToButton from "../ScrollToButton";

describe("test ScrollToButton", () => {
  it("renders the button when isVisible is false", () => {
    const ref = { current: document.createElement("div") };
    render(
      <ScrollToButton refToScroll={ref} isVisible={false} text="Scroll Down" />,
    );
    expect(screen.getByText(/Scroll Down/i)).toBeInTheDocument();
  });

  it("does not render the button when isVisible is true", () => {
    const ref = { current: document.createElement("div") };
    render(<ScrollToButton refToScroll={ref} isVisible text="Scroll Down" />);
    expect(screen.queryByText(/Scroll Down/i)).not.toBeInTheDocument();
  });

  it("calls scrollIntoView on ref current when button is clicked", () => {
    const ref = { current: document.createElement("div") };
    // Mock the scrollIntoView function
    ref.current.scrollIntoView = jest.fn();

    render(
      <ScrollToButton refToScroll={ref} isVisible={false} text="Scroll Down" />,
    );
    fireEvent.click(screen.getByText(/Scroll Down/i));

    expect(ref.current.scrollIntoView).toHaveBeenCalled();
  });

  it("does not attempt to call scrollIntoView if ref current is null", () => {
    const ref = { current: null };
    // Spy on console to check for errors
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <ScrollToButton refToScroll={ref} isVisible={false} text="Scroll Down" />,
    );
    fireEvent.click(screen.getByText(/Scroll Down/i));

    // Ensure no console errors were called
    expect(consoleSpy).not.toHaveBeenCalled();

    // Clean up spy to avoid affecting other tests
    consoleSpy.mockRestore();
  });
});
