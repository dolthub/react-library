import { act, renderHook } from "@testing-library/react";
import { useSetState } from "..";

describe("useSetState", () => {
  it("should init state and setter", () => {
    const { result } = renderHook(() => useSetState({ foo: "bar" }));
    const [state, setState] = result.current;

    expect(state).toEqual({ foo: "bar" });
    expect(setState).toBeInstanceOf(Function);
  });

  it("should init empty state if not initial state provided", () => {
    const { result } = renderHook(() => useSetState({}));

    expect(result.current[0]).toEqual({});
  });

  it("should merge changes into current state when providing object", () => {
    const { result } = renderHook(() => useSetState({ foo: "bar", count: 1 }));
    const [state, setState] = result.current;

    act(() => {
      setState({ count: state.count + 1 });
    });

    expect(result.current[0]).toEqual({ foo: "bar", count: 2 });
  });

  /**
   * Enforces cases where a hook can safely depend on the callback without
   * causing an endless rerender cycle: useEffect(() => setState({ data }), [setState]);
   */
  it("should return a memoized setState callback", () => {
    const { result, rerender } = renderHook(() => useSetState({ ok: false }));
    const [, setState1] = result.current;

    act(() => {
      setState1({ ok: true });
    });
    rerender();

    const [, setState2] = result.current;

    expect(setState1).toBe(setState2);
  });
});
