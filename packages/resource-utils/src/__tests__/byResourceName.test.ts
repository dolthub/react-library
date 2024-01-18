import byResourceName from "../byResourceName";

it("compares two objects by name property", () => {
  const o1 = { name: "foo/bar" };
  const o2 = { name: "foo/baz" };

  expect(byResourceName(o1, o2)).toBe(-1);
});
