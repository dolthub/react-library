import { emailValidator, usernameValidator } from "../validators";

describe("emailValidator", () => {
  it("is valid", () => {
    expect(emailValidator("me@dolthub.com").isValid).toBe(true);
    expect(emailValidator("me+you@dolthub.com").isValid).toBe(true);
  });

  it("is not valid", () => {
    expect(emailValidator("medolthub.com").isValid).toBe(false);
    expect(emailValidator("me+you@dolthub").isValid).toBe(false);
    expect(emailValidator("").isValid).toBe(false);
    expect(emailValidator("@dolthub.com").isValid).toBe(false);
  });
});

describe("usernameValidator", () => {
  it("is valid", () => {
    const validVal = usernameValidator("meandyou");
    expect(validVal.isValid).toBe(true);
    expect(validVal.detailedErrorMsg).toBe("");

    expect(usernameValidator("me_you").isValid).toBe(true);
    expect(usernameValidator("me-you").isValid).toBe(true);
    expect(usernameValidator("me_you-123").isValid).toBe(true);
  });

  it("is not valid", () => {
    const tooShortVal = usernameValidator("me");
    expect(tooShortVal.isValid).toBe(false);
    expect(tooShortVal.detailedErrorMsg).toBe("Username too short");

    const tooLongVal = usernameValidator(
      "me_you-1234567890123456789012345678901234567890",
    );
    expect(tooLongVal.isValid).toBe(false);
    expect(tooLongVal.detailedErrorMsg).toBe("Username too long");

    const uppercaseVal = usernameValidator("Me_you");
    expect(uppercaseVal.isValid).toBe(false);
    expect(uppercaseVal.detailedErrorMsg).toBe(
      "Username cannot have uppercase letters",
    );

    const invalidVal = usernameValidator("me_you!");
    expect(invalidVal.isValid).toBe(false);
    expect(invalidVal.detailedErrorMsg).toBe("Username invalid");

    const invalidVal2 = usernameValidator("me_you-");
    expect(invalidVal2.isValid).toBe(false);
    expect(invalidVal2.detailedErrorMsg).toBe("Username invalid");
  });
});
