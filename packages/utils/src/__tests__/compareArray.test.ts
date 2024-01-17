import compareArray from "../compareArray";

describe("compareArray", () => {
  it("should return true if arrays are equal", () => {
    expect(compareArray(["a", "b", "c"], ["a", "b", "c"])).toBe(true);
  });
  it("should return false if arrays are equal but have different order", () => {
    expect(compareArray(["a", "b", "c"], ["c", "a", "b"])).toBe(true);
  });
  it("should return false if arrays are not equal", () => {
    expect(compareArray(["a", "b", "c"], ["a", "b", "d"])).toBe(false);
  });
  it("should return false if arrays are not equal and have different order", () => {
    expect(compareArray(["a", "b", "c"], ["c", "a", "d"])).toBe(false);
  });
  it("should return false if arrays are not equal and have different length", () => {
    expect(compareArray(["a", "b", "c"], ["a", "b"])).toBe(false);
  });
});
