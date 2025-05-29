import { act, renderHook } from "@testing-library/react";
import useElementIsVisible from "../useElementIsVisible";

describe("useElementIsVisible", () => {
  let mockObserve: jest.Mock;
  let mockDisconnect: jest.Mock;
  let mockTriggerIntersect: (entries: IntersectionObserverEntry[]) => void;

  // Mock IntersectionObserver
  beforeAll(() => {
    mockObserve = jest.fn();
    mockDisconnect = jest.fn();

    global.IntersectionObserver = jest.fn((callback, opts = {}) => {
      mockTriggerIntersect = (entries: IntersectionObserverEntry[]) =>
        callback(entries, new IntersectionObserver(() => null));

      return {
        root: opts.root ?? null,
        rootMargin: opts.rootMargin ?? "",
        observe: mockObserve,
        disconnect: mockDisconnect,
        unobserve: jest.fn(),
        thresholds: [],
        takeRecords: jest.fn(),
      };
    });

    jest
      .spyOn(document, "querySelector")
      .mockImplementation((sel: string) =>
        sel === "#notFound" ? null : document.createElement("div"),
      );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("initializes with isIntersecting as false", () => {
    const { result } = renderHook(() => useElementIsVisible("#testElement"));
    expect(result.current).toBe(false);
  });

  it("does nothing if ID not found", () => {
    const { result, unmount } = renderHook(() =>
      useElementIsVisible("#notFound"),
    );
    expect(result.current).toBe(false);
    expect(mockObserve).not.toHaveBeenCalled();

    unmount();

    expect(mockDisconnect).not.toHaveBeenCalled();
  });

  it("updates isIntersecting when element becomes visible", () => {
    const { result } = renderHook(() => useElementIsVisible("#testElement"));

    act(() => {
      mockTriggerIntersect([
        { isIntersecting: true } as IntersectionObserverEntry,
      ]);
    });

    expect(result.current).toBe(true);
    expect(mockObserve).toHaveBeenCalled();
  });

  it("disconnects IntersectionObserver on unmount", () => {
    const { unmount } = renderHook(() => useElementIsVisible("#testElement"));

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });
});
