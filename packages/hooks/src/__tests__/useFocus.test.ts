import { act, renderHook } from "@testing-library/react";
import useFocus from "../useFocus";

describe("useFocus", () => {
  // Mocking DOM methods
  const mockScrollIntoView = jest.fn();
  const mockScrollTo = jest.fn();
  const mockFocus = jest.fn();

  beforeAll(() => {
    jest.spyOn(document, "getElementById").mockImplementation(
      (id: string) =>
        ({
          scrollIntoView: mockScrollIntoView,
          scrollTo: mockScrollTo,
          focus: mockFocus,
          id,
        }) as any, // Type casting to any to simplify mock structure
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("initializes with default states", () => {
    const { result } = renderHook(() => useFocus());
    expect(result.current.setScrollToTop).toBeDefined();
    expect(result.current.setRefocus).toBeDefined();
  });

  it("handles scrollToTop", () => {
    const { result } = renderHook(() => useFocus());

    act(() => {
      result.current.setScrollToTop(true);
    });

    expect(mockScrollIntoView).toHaveBeenCalled();
    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("handles refocus", () => {
    const { result } = renderHook(() => useFocus());

    act(() => {
      result.current.setRefocus(true);
    });

    expect(mockFocus).toHaveBeenCalled();
  });
});
