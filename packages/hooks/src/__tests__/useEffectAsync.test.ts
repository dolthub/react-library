import { renderHook } from "@testing-library/react-hooks";
import { useEffectAsync } from "..";

const mockEffectCleanup = jest.fn();
const mockEffectCallback = jest.fn().mockReturnValue(mockEffectCleanup);

describe("useEffectAsync", () => {
  it("should run provided effect", () => {
    const val = 1;
    const { rerender } = renderHook(() =>
      useEffectAsync(mockEffectCallback, [val]),
    );
    expect(mockEffectCallback).toHaveBeenCalledTimes(1);
    expect(mockEffectCallback).toHaveBeenCalledWith({ subscribed: true });

    rerender();
    expect(mockEffectCallback).toHaveBeenCalledTimes(2);
  });
});
