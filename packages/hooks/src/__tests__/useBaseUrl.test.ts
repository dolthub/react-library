import { act, renderHook } from "@testing-library/react-hooks";
import useBaseUrl from "../useBaseUrl";

describe("useBaseUrl", () => {
  // it("initializes with the default URL", () => {
  //   const defaultUrl = "http://default.com";
  //   const { result } = renderHook(() =>
  //     useBaseUrl(() => "http://example.com", defaultUrl),
  //   );

  //   expect(result.current).toBe(defaultUrl);
  // });

  it("updates URL based on getUrlFn on first render", () => {
    const getUrlFn = () => "http://example.com";
    const { result } = renderHook(() => useBaseUrl(getUrlFn));

    expect(result.current).toBe(getUrlFn());
  });

  it("does not update URL more than once", () => {
    const getUrlFn = () => "http://example.com";
    const { result, rerender } = renderHook(() => useBaseUrl(getUrlFn));

    // URL should be set after first render
    expect(result.current).toBe(getUrlFn());

    // Mock new getUrlFn to return a different URL
    const newGetUrlFn = () => "http://newexample.com";

    // Re-render the hook with new getUrlFn
    act(() => {
      rerender(() => useBaseUrl(newGetUrlFn));
    });

    // URL should not change after re-rendering
    expect(result.current).toBe(getUrlFn());
  });
});
