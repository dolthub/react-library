import { renderHook } from "@testing-library/react-hooks";
import useOnClickOutside from "../useOnClickOutside";

describe("useOnClickOutside", () => {
  it("calls action on outside click", () => {
    const mockAction = jest.fn();
    const excludingRef = { current: document.createElement("div") };

    renderHook(() => useOnClickOutside(excludingRef, mockAction));

    const event = new MouseEvent("mousedown", { bubbles: true });
    document.dispatchEvent(event);

    expect(mockAction).toHaveBeenCalled();
  });

  it("does not call action on inside click", () => {
    const mockAction = jest.fn();
    const excludingRef = { current: document.createElement("div") };

    renderHook(() => useOnClickOutside(excludingRef, mockAction));

    const event = new MouseEvent("mousedown", { bubbles: true });
    excludingRef.current.dispatchEvent(event);

    expect(mockAction).not.toHaveBeenCalled();
  });
});
