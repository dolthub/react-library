import byHash from "../byHash";

it("compares two objects by last param in resourceName property, expecting the last param to be a hash", () => {
  const o1 = { name: "foo/00000000-0000-0000-0000-000000000123" };
  const o2 = { name: "foo/00000000-0000-0000-0000-000000000001" };
  const o3 = { name: "foo/00000000-0000-0000-0000-000009999999" };

  expect(byHash(o1, o2)).toBe(1);
  expect(byHash(o1, o3)).toBe(-1);
  expect(byHash(o2, o2)).toBe(0);
});
