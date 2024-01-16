import safeJSONParse from "../safeJSONParse";

describe("test safeJSONParse", () => {
  it("works for valid json", () => {
    const validJson = [
      '{"test": 1}',
      "{}",
      "[]",
      "[1, 2, 3]",
      '"valid string"',
    ];
    validJson.forEach(json => {
      expect(safeJSONParse(json)).toEqual(JSON.parse(json));
    });
  });

  it("works for invalid json", () => {
    const invalidJson = [
      "invalid string",
      "{invalid}",
      "[invalid]",
      '{"good": bad}',
    ];
    invalidJson.forEach(json => {
      expect(safeJSONParse(json)).toEqual(json);
    });
  });
});
