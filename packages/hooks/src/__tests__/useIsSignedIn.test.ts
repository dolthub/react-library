import { renderHook } from "@testing-library/react";
import cookie from "js-cookie";
import useIsSignedIn from "../useIsSignedIn";

jest.mock("js-cookie");

describe("useIsSignedIn", () => {
  const tokenKey = "authToken";

  it("initializes as not signed in", () => {
    (cookie.get as jest.Mock).mockReturnValue(null);
    const { result } = renderHook(() => useIsSignedIn(tokenKey));

    expect(result.current).toBe(false);
  });

  it("returns true when token is present", () => {
    (cookie.get as jest.Mock).mockReturnValue("tokenValue");
    const { result } = renderHook(() => useIsSignedIn(tokenKey));

    expect(result.current).toBe(true);
  });

  it("returns false when token is not present", () => {
    (cookie.get as jest.Mock).mockReturnValue(null);
    const { result } = renderHook(() => useIsSignedIn(tokenKey));

    expect(result.current).toBe(false);
  });
});
