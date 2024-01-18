import byName from "../byName";

it("compares two objects by last param in resourceName property", () => {
  const o1 = { name: "foo/bar" };
  const o2 = { name: "foo/baz" };

  expect(byName(o1, o2)).toBe(-1);
});
