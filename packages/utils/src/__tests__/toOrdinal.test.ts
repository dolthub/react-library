import toOrdinal from "../toOrdinal";

describe("toOrdinal", () => {
  test.each([
    [1, "1st"],
    [2, "2nd"],
    [3, "3rd"],
    [4, "4th"],
    [11, "11th"],
    [12, "12th"],
    [13, "13th"],
    [21, "21st"],
    [22, "22nd"],
    [23, "23rd"],
    [101, "101st"],
    [111, "111th"],
    [112, "112th"],
    [113, "113th"],
    [1001, "1001st"],
    [1002, "1002nd"],
    [1003, "1003rd"],
    [1004, "1004th"],
  ])("converts number %i to ordinal %s", (input, expected) => {
    expect(toOrdinal(input)).toBe(expected);
  });
});
