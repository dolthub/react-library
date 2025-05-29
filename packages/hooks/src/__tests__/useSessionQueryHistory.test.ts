import { act, renderHook } from "@testing-library/react";
import useSessionQueryHistory from "../useSessionQueryHistory";

// jest.mock("../useStateWithSessionStorage", () =>
//   jest.fn().mockImplementation((key, initialValue) => {
//     let value = initialValue;
//     return [
//       value,
//       (newValue: string) => {
//         value = newValue;
//       },
//     ];
//   }),
// );

describe("useSessionQueryHistory", () => {
  const databaseName = "testDB";

  beforeEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  it("initializes correctly", () => {
    const { result } = renderHook(() => useSessionQueryHistory(databaseName));

    expect(result.current.history).toEqual([]);
    expect(result.current.queryIdx).toBeUndefined();
  });

  it("adds a query to the history", () => {
    const { result } = renderHook(() => useSessionQueryHistory(databaseName));

    act(() => {
      result.current.addQuery("SELECT * FROM table");
    });

    expect(result.current.history).toEqual(["SELECT * FROM table"]);
  });

  it("adds a mutation and checks if query is recent mutation", () => {
    const { result } = renderHook(() => useSessionQueryHistory(databaseName));

    act(() => {
      result.current.addMutation("INSERT INTO table VALUES (1, 2)");
    });

    expect(
      result.current.queryIsRecentMutation("INSERT INTO table VALUES (1, 2)"),
    ).toBe(true);
    expect(result.current.queryIsRecentMutation("SELECT * FROM table")).toBe(
      false,
    );
  });

  it("navigates to next and previous query correctly", () => {
    const q1 = "SELECT * FROM table1";
    const q2 = "SELECT * FROM table2";
    const { result } = renderHook(() => useSessionQueryHistory(databaseName));

    act(() => {
      result.current.addQuery(q1);
    });
    expect(result.current.history).toEqual([q1]);

    act(() => {
      result.current.addQuery(q2);
    });

    expect(result.current.queryIdx).toBe(undefined);
    expect(result.current.history).toEqual([q2, q1]);

    // No next query
    let nextQuery;
    act(() => {
      nextQuery = result.current.getNextQuery();
    });

    expect(nextQuery).toEqual(undefined);
    expect(result.current.queryIdx).toBe(undefined);

    // Previous query
    let prevQuery;
    act(() => {
      prevQuery = result.current.getPrevQuery(() => false);
    });

    expect(prevQuery).toEqual(q2);
    expect(result.current.queryIdx).toBe(0);

    // Previous query again
    act(() => {
      prevQuery = result.current.getPrevQuery(() => false);
    });

    expect(result.current.queryIdx).toBe(1);
    expect(prevQuery).toEqual(q1);

    // No previous query
    act(() => {
      prevQuery = result.current.getPrevQuery(() => false);
    });

    expect(result.current.queryIdx).toBe(1);
    expect(prevQuery).toEqual(undefined);

    // Next query
    act(() => {
      nextQuery = result.current.getNextQuery();
    });

    expect(nextQuery).toEqual(q2);
    expect(result.current.queryIdx).toBe(0);

    // No next query
    act(() => {
      nextQuery = result.current.getNextQuery();
    });

    expect(nextQuery).toEqual(undefined);
    expect(result.current.queryIdx).toBe(0);
  });

  it("skips first previous query when condition is met", () => {
    const q1 = "SELECT * FROM table1";
    const q2 = "SELECT * FROM table2";
    const { result } = renderHook(() => useSessionQueryHistory(databaseName));

    act(() => {
      result.current.addQuery(q1);
    });

    act(() => {
      result.current.addQuery(q2);
    });

    let prevQuery;
    act(() => {
      prevQuery = result.current.getPrevQuery(s => s.includes("table1"));
    });

    expect(prevQuery).toEqual(q2);
    expect(result.current.queryIdx).toBe(0);
  });
});
