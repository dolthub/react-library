import { act, renderHook } from "@testing-library/react";
import useEffectAsync from "../useEffectAsync";

describe("useEffectAsync", () => {
  it("should call the provided async function", async () => {
    const asyncFunction = jest.fn(async () => Promise.resolve());
    renderHook(() => useEffectAsync(asyncFunction));
    expect(asyncFunction).toHaveBeenCalledTimes(1);
  });

  it("should handle async function rejection and log an error", async () => {
    const err = new Error("Error");
    const asyncFunction = jest.fn(async () => Promise.reject(err));
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    renderHook(() => useEffectAsync(asyncFunction));
    await act(async () => {});

    expect(errorSpy).toHaveBeenCalledWith(err);
    errorSpy.mockRestore();
  });
});
