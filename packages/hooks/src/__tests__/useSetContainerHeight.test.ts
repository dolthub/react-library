/* eslint-disable testing-library/no-node-access */
import { renderHook } from "@testing-library/react";
import { useReactiveHeight } from "../useReactiveSize";
import useSetContainerHeight from "../useSetContainerHeight";

describe("useSetContainerHeight", () => {
  const componentID = "testComponent";

  beforeAll(() => {
    const mockElement = document.createElement("div");
    mockElement.id = componentID;

    mockElement.getBoundingClientRect = jest.fn().mockReturnValue({ top: 100 });

    document.body.appendChild(mockElement);

    global.document.getElementById = jest.fn(id => {
      if (id === componentID) {
        return mockElement;
      }
      return null;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    const mockElement = document.getElementById(componentID);
    if (mockElement) {
      document.body.removeChild(mockElement);
    }
  });

  it("calculates container height correctly based on window height", () => {
    const { result: windowHeightResult } = renderHook(() =>
      useReactiveHeight(),
    );
    const windowHeight = windowHeightResult.current;

    const { result } = renderHook(() => useSetContainerHeight(componentID));

    const expectedHeight = windowHeight - 100;

    expect(result.current.containerHeight).toBe(expectedHeight);
  });
});
