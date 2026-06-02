import { act, renderHook } from "@testing-library/react";
import { replaceRaf } from "raf-stub";
import {
  useReactiveElementHeight,
  useReactiveHeight,
  useReactiveWidth,
} from "..";

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

function createElement(): HTMLElement {
  const element = document.createElement("div");
  Object.defineProperty(element, "clientHeight", {
    configurable: true,
    value: 500,
  });
  Object.defineProperty(element, "scrollWidth", {
    configurable: true,
    value: 300,
  });
  return element;
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

describe("useReactiveElementHeight", () => {
  beforeAll(() => {
    replaceRaf();
  });

  beforeEach(() => {
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 800,
    });
  });

  afterEach(() => {
    requestAnimationFrame.reset();
  });

  it("initializes with element clientHeight", () => {
    const element = createElement();
    const { result } = renderHook(() => useReactiveElementHeight(element));

    expect(result.current).toBe(500);
  });

  it("initializes with window.innerHeight when element is undefined", () => {
    const { result } = renderHook(() => useReactiveElementHeight());

    expect(result.current).toBe(800);
  });

  it("updates on window resize for no element", () => {
    const { result } = renderHook(() => useReactiveElementHeight());

    act(() => {
      triggerResize("height", 360);
      requestAnimationFrame.step();
    });

    expect(result.current).toBe(360);
  });
});
