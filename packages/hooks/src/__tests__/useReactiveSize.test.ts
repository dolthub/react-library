import { act, renderHook } from "@testing-library/react-hooks";
import { replaceRaf } from "raf-stub";
import { useReactiveHeight, useReactiveWidth } from "..";

declare let requestAnimationFrame: {
  reset: () => void;
  step: (steps?: number, duration?: number) => void;
};

function triggerResize(dimension: "width" | "height", value: number) {
  if (dimension === "width") {
    (window.innerWidth as number) = value;
  } else {
    (window.innerHeight as number) = value;
  }

  window.dispatchEvent(new Event("resize"));
}

describe("useReactiveWidth", () => {
  beforeAll(() => {
    replaceRaf();
  });

  afterEach(() => {
    requestAnimationFrame.reset();
  });

  it("should return current window width", () => {
    const { result } = renderHook(() => useReactiveWidth());
    expect(typeof result.current).toBe("object");
    expect(typeof result.current.clientWidth).toBe("number");
  });

  it("should handle mobile breakpoint", () => {
    const mobileBreakpoint = 1024;
    const { result } = renderHook(() => useReactiveWidth(mobileBreakpoint));

    act(() => {
      triggerResize("width", 360);
      requestAnimationFrame.step();
    });

    expect(result.current.clientWidth).toBe(360);
    expect(result.current.isMobile).toBe(true);

    act(() => {
      triggerResize("width", 1000);
      requestAnimationFrame.step();
    });

    expect(result.current.clientWidth).toBe(1000);
    expect(result.current.isMobile).toBe(true);
  });

  it("should re-render after width change on closest RAF", () => {
    const { result } = renderHook(() => useReactiveWidth());

    act(() => {
      triggerResize("width", 360);
      requestAnimationFrame.step();
    });

    expect(result.current.clientWidth).toBe(360);
    expect(result.current.isMobile).toBe(true);

    act(() => {
      triggerResize("width", 1000);
      requestAnimationFrame.step();
    });

    expect(result.current.clientWidth).toBe(1000);
    expect(result.current.isMobile).toBe(false);
  });
});

describe("useReactiveHeight", () => {
  beforeAll(() => {
    replaceRaf();
  });

  afterEach(() => {
    requestAnimationFrame.reset();
  });

  it("should return current window height", () => {
    const { result } = renderHook(() => useReactiveHeight());
    expect(typeof result.current).toBe("number");
  });

  it("should re-render after height change on closest RAF", () => {
    const { result } = renderHook(() => useReactiveHeight());

    act(() => {
      triggerResize("height", 360);
      requestAnimationFrame.step();
    });

    expect(result.current).toBe(360);

    act(() => {
      triggerResize("height", 2048);
      requestAnimationFrame.step();
    });

    expect(result.current).toBe(2048);
  });
});
