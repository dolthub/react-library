import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import CopyToClipboard from "../CopyToClipboard";

describe("test CopyToClipboard", () => {
  it("copies text and calls onCopy when the child is clicked", () => {
    const onCopy = jest.fn();
    render(
      <CopyToClipboard text="hello world" onCopy={onCopy}>
        <button type="button">Copy</button>
      </CopyToClipboard>,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith(
      "hello world",
    );
    expect(onCopy).toHaveBeenCalledWith("hello world", true);
  });

  it("preserves the child's own onClick", () => {
    const childClick = jest.fn();
    render(
      <CopyToClipboard text="x">
        <button type="button" onClick={childClick}>
          Copy
        </button>
      </CopyToClipboard>,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(childClick).toHaveBeenCalledTimes(1);
  });
});
