import { act, renderHook } from "@testing-library/react-hooks";
import { useHotKeysForToggle } from "../useHotKeys";

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
