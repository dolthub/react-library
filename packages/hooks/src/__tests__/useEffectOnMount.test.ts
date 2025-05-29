import { renderHook } from "@testing-library/react";
import useEffectOnMount from "../useEffectOnMount";

describe("useEffectOnMount", () => {
  it("should call the provided function on mount", () => {
    const mockFunction = jest.fn();
    renderHook(() => useEffectOnMount(mockFunction));
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it("should not call the provided function on re-renders", () => {
    const mockFunction = jest.fn();
    const { rerender } = renderHook(() => useEffectOnMount(mockFunction));
    rerender();
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it("should not call the provided function when unmounted", () => {
    const mockFunction = jest.fn();
    const { unmount } = renderHook(() => useEffectOnMount(mockFunction));
    unmount();
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
});
