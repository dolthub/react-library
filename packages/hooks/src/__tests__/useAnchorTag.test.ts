import { act, renderHook } from "@testing-library/react";
import useAnchorTag from "../useAnchorTag";

describe("useAnchorTag", () => {
  let originalLocation = {} as Location;

  beforeAll(() => {
    originalLocation = window.location;
    delete (window as any).location;
    (window as any).location = { hash: "" } as Location;
  });

  afterAll(() => {
    (window as any).location = originalLocation;
  });

  it("should update window.location.hash when there is no hash", () => {
    window.location.hash = "";
    const { rerender } = renderHook(() => useAnchorTag());

    act(() => {
      rerender();
    });

    expect(window.location.hash).toBe("");
  });

  it("should update window.location.hash when there is a hash", () => {
    window.location.hash = "#initialHash";

    const { rerender } = renderHook(() => useAnchorTag());

    act(() => {
      rerender();
    });

    expect(window.location.hash).toBe("#initialHash");
  });
});
