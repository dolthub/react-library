import prettyJSON, { prettyJSONText } from "../prettyJSON";

const expected = `{
  "foo": "bar",
  "baz": {
    "boom": 123
  }
}`;

describe("prettyJSON", () => {
  it("renders JSON in a readable format", () => {
    const data = { foo: "bar", baz: { boom: 123 } };
    expect(prettyJSON(data)).toBe(expected);
  });
});

describe("prettyJSONText", () => {
  it("parses and renders JSON text in a readable format", () => {
    const data = `{ "foo": "bar", "baz": { "boom": 123 } }`;
    expect(prettyJSONText(data)).toBe(expected);
  });

  it("bad json returns original string", () => {
    const data = `{ "foo": bad, "baz": { "boom": 123 } }`;
    expect(prettyJSONText(data)).toBe(data);
  });
});
