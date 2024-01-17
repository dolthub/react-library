import {
  NULL_VALUE,
  getDisplayValue,
  getDisplayValueForApi,
  isNullValue,
} from "../null";

describe("isNullValue", () => {
  it("is null", () => {
    expect(isNullValue(NULL_VALUE)).toBe(true);
  });
  it("is not null", () => {
    expect(isNullValue("other")).toBe(false);
    expect(isNullValue("")).toBe(false);
    expect(isNullValue("null")).toBe(false);
  });
});

describe("getDisplayValue", () => {
  it("is null", () => {
    expect(getDisplayValue(NULL_VALUE)).toBe("NULL");
  });
  it("is not null", () => {
    expect(getDisplayValue("other")).toBe("other");
    expect(getDisplayValue("")).toBe("");
    expect(getDisplayValue("null")).toBe("null");
  });
});

describe("getDisplayValueForApi", () => {
  it("is null", () => {
    expect(getDisplayValueForApi(NULL_VALUE)).toBe(null);
  });
  it("is not null", () => {
    expect(getDisplayValueForApi("other")).toBe("other");
    expect(getDisplayValueForApi("")).toBe("");
    expect(getDisplayValueForApi("null")).toBe("null");
  });
});
