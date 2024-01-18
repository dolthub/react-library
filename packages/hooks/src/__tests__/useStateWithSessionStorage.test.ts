import { act, renderHook } from "@testing-library/react-hooks";
import useStateWithSessionStorage from "../useStateWithSessionStorage";

describe("useStateWithSessionStorage", () => {
  const storageKey = "testKey";

  beforeEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  it("initializes with value from sessionStorage", () => {
    const storedValue = "storedValue";
    sessionStorage.setItem(storageKey, storedValue);

    const { result } = renderHook(() => useStateWithSessionStorage(storageKey));

    expect(result.current[0]).toBe(storedValue);
  });

  it("initializes with default value when sessionStorage is empty", () => {
    const defaultValue = "defaultValue";
    const { result } = renderHook(() =>
      useStateWithSessionStorage(storageKey, defaultValue),
    );

    expect(result.current[0]).toBe(defaultValue);
  });

  it("updates sessionStorage when value changes", () => {
    const newValue = "newValue";
    const { result } = renderHook(() => useStateWithSessionStorage(storageKey));
    const [, setValue] = result.current;

    act(() => {
      setValue(newValue);
    });

    expect(sessionStorage.getItem(storageKey)).toBe(newValue);
  });
});
