import displayName from "../displayName";

class User {
  displayName: string;

  name: string;

  constructor() {
    this.displayName = "";
    this.name = "";
  }

  setName(value: string): void {
    this.name = value;
  }

  setDisplayName(value: string): void {
    this.displayName = value;
  }

  toObject(): User.AsObject {
    return {
      displayName: this.displayName,
      name: this.name,
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace User {
  export type AsObject = {
    name: string;
    displayName: string;
  };
}

const userWithDisplayName = new User();
userWithDisplayName.setName("users/fooUser");
userWithDisplayName.setDisplayName("Foo User");

const userWithoutDisplayName = new User();
userWithoutDisplayName.setName("users/barUser");

it("returns the displayName for a `NamedResource` when it exists", () => {
  expect(displayName(userWithDisplayName.toObject())).toBe("Foo User");
});
it("returns the displayName for an `Objectable` when it exists", () => {
  expect(displayName(userWithDisplayName)).toBe("Foo User");
});
// it("returns the shortname for a `NamedResource` when `displayName` does not exist", () => {
//   expect(displayName(repo.toObject())).toBe("fooRepo");
// });
it("returns the shortname for a `NamedResource` when `displayName` is undefined", () => {
  expect(displayName(userWithoutDisplayName.toObject())).toBe("barUser");
});
// it("returns the shortname for an `Objectable` when `getDisplayName` does not exist", () => {
//   expect(displayName(repo)).toBe("fooRepo");
// });
it("returns the shortname for an `Objectable` when `getDisplayName` returns `undefined`", () => {
  expect(displayName(userWithoutDisplayName)).toBe("barUser");
});
