import initialUppercase from "../initialUppercase";

test("it capitalizes the first letter of a string", () => {
  expect(initialUppercase("let's case the HELL out of this sentence!")).toBe(
    "Let's case the HELL out of this sentence!",
  );
});
