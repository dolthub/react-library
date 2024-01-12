import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import useContextWithError from "../useContextWithError";

const logSpy = jest.spyOn(console, "error");

describe("useContextWithError", () => {
  it("should not console error when context is defined", () => {
    renderHook(() => useContextWithError(React.createContext({})));

    expect(logSpy).not.toHaveBeenCalledWith(
      `useContext must be used within a child of ContextProvider for context: undefined`,
    );
  });

  it("should console error when context is defined", () => {
    renderHook(() => useContextWithError(React.createContext(undefined)));

    expect(logSpy).toHaveBeenCalledWith(
      `useContext must be used within a child of ContextProvider for context: undefined`,
    );
  });
});
