import { renderHook } from "@testing-library/react-hooks";
import { useEffectOnMount } from "..";

const mockEffectCleanup = jest.fn();
const mockEffectCallback = jest.fn().mockReturnValue(mockEffectCleanup);

describe("useEffectOnMount", () => {
  it("should run provided effect only once", () => {
    const { rerender } = renderHook(() => useEffectOnMount(mockEffectCallback));
    expect(mockEffectCallback).toHaveBeenCalledTimes(1);

    rerender();
    expect(mockEffectCallback).toHaveBeenCalledTimes(1);
  });

  it("should run clean-up provided on unmount", () => {
    const { unmount } = renderHook(() => useEffectOnMount(mockEffectCallback));
    expect(mockEffectCleanup).not.toHaveBeenCalled();

    unmount();
    expect(mockEffectCleanup).toHaveBeenCalledTimes(1);
  });
});
