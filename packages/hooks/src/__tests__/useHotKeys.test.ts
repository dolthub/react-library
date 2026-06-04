import { act, fireEvent, render, renderHook } from "@testing-library/react";
import React from "react";
import { GlobalHotKeys, useHotKeysForToggle } from "../useHotKeys";

describe("useHotKeysForToggle", () => {
  it("initializes with default keyMap and handlers", () => {
    const { result } = renderHook(() => useHotKeysForToggle(jest.fn()));

    expect(result.current.keyMap).toEqual({
      TOGGLE_EDITOR: ["meta+shift+enter", "ctrl+shift+enter"],
    });
    expect(result.current.handlers).toBeDefined();
    expect(result.current.handlers.TOGGLE_EDITOR).toBeDefined();
  });

  it("toggles when handler is invoked", () => {
    const mockToggle = jest.fn();
    const { result } = renderHook(() => useHotKeysForToggle(mockToggle));

    // Simulate the handler being called
    act(() => {
      result.current.handlers.TOGGLE_EDITOR();
    });

    // The toggle function should be called
    expect(mockToggle).toHaveBeenCalled();
  });
});

describe("GlobalHotKeys", () => {
  const renderWithHandler = (handler: jest.Mock) =>
    render(
      React.createElement(GlobalHotKeys, {
        keyMap: { TOGGLE_EDITOR: ["meta+shift+enter", "ctrl+shift+enter"] },
        handlers: { TOGGLE_EDITOR: handler },
      }),
    );

  it("fires the handler when a mapped combo is pressed", () => {
    const handler = jest.fn();
    renderWithHandler(handler);

    fireEvent.keyDown(document, {
      key: "Enter",
      metaKey: true,
      shiftKey: true,
    });

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("matches any combo in the list", () => {
    const handler = jest.fn();
    renderWithHandler(handler);

    fireEvent.keyDown(document, {
      key: "Enter",
      ctrlKey: true,
      shiftKey: true,
    });

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("does not fire when modifiers don't match", () => {
    const handler = jest.fn();
    renderWithHandler(handler);

    // Missing shift
    fireEvent.keyDown(document, { key: "Enter", metaKey: true });
    // Right key, no modifiers
    fireEvent.keyDown(document, { key: "Enter" });

    expect(handler).not.toHaveBeenCalled();
  });

  it("stops listening after unmount", () => {
    const handler = jest.fn();
    const { unmount } = renderWithHandler(handler);

    unmount();
    fireEvent.keyDown(document, {
      key: "Enter",
      metaKey: true,
      shiftKey: true,
    });

    expect(handler).not.toHaveBeenCalled();
  });
});
