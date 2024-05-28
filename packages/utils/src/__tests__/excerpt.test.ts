import excerpt from "../excerpt";

test("does not modify a string shorter than the specified length", () => {
  expect(excerpt("shorter string", 100)).toBe("shorter string");
});

test("truncates an excerpt longer than the specified length", () => {
  expect(excerpt("there are 38 characters in this string", 30)).toBe(
    "there are 38 characters in th…",
  );
});

test("does not modify a full-width string shorter than the specified length", () => {
  expect(excerpt("短い文字列", 100)).toBe("短い文字列");
});

test("truncates a full-width excerpt longer than the specified length", () => {
  expect(excerpt("この文字列には38文字が含まれています", 18)).toBe(
    "この文字列には38…",
  );
});
