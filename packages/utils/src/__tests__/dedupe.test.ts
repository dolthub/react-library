import dedupe from "../dedupe";

const tests: Array<{ desc: string; arr: any[]; expect: any[] }> = [
  {
    desc: "no duplicates",
    arr: ["a", "b", "c", undefined],
    expect: ["a", "b", "c", undefined],
  },
  {
    desc: "array of strings",
    arr: ["a", "b", "c", "b"],
    expect: ["a", "b", "c"],
  },
  {
    desc: "array of numbers",
    arr: [5, 9, 200, 200, 90, 0, 200],
    expect: [5, 9, 200, 90, 0],
  },
  {
    desc: "array of mixed",
    arr: [true, 5, 9, "a", false, 200, 90, 0, "a", 200, true],
    expect: [true, 5, 9, "a", false, 200, 90, 0],
  },
];

describe("test dedupe", () => {
  tests.forEach(test => {
    it(`dedupes ${test.desc}`, () => {
      expect(dedupe(test.arr)).toEqual(test.expect);
    });
  });
});
