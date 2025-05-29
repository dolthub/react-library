import { act, renderHook } from "@testing-library/react";
import { useDelay } from "..";

describe("useDelay", () => {
  beforeEach(() => {
    jest.spyOn(global, "setTimeout");
    jest.spyOn(global, "clearTimeout");
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should init hook without being active", () => {
    const { result } = renderHook(() => useDelay());

    expect(result.current).toStrictEqual({
      active: false,
      start: expect.any(Function),
      stop: expect.any(Function),
    });
    expect(setTimeout).not.toHaveBeenCalled();
    expect(clearTimeout).not.toHaveBeenCalled();
  });

  it("should manually start and stop", () => {
    const { result, rerender } = renderHook(() => useDelay());

    expect(result.current.active).toBe(false);

    act(() => {
      result.current.start();
    });
    expect(result.current.active).toBe(true);

    rerender();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(clearTimeout).not.toHaveBeenCalled();

    act(() => {
      result.current.stop();
    });
    expect(result.current.active).toBe(false);
  });

  it("should automatically stop after time", () => {
    const delayMs = 10;
    const { result, rerender } = renderHook(() => useDelay(delayMs));

    expect(result.current.active).toBe(false);

    act(() => {
      result.current.start();
    });
    expect(result.current.active).toBe(true);

    rerender();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(clearTimeout).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(delayMs);
    });

    rerender();
    expect(result.current.active).toBe(false);
    expect(clearTimeout).toHaveBeenCalled();
  });

  it("should automatically stop for errors", () => {
    const { result, rerender } = renderHook(() => useDelay(1000, ["error"]));

    expect(result.current.active).toBe(false);

    act(() => {
      result.current.start();
    });
    // Since there's an error in the dependency array, the error effect
    // will immediately stop the hook, so it should be false
    expect(result.current.active).toBe(false);

    rerender();
    expect(result.current.active).toBe(false);
  });
});
