import { getProdError } from "../doParamValidation";

test("getProdError gets production error", () => {
  expect(getProdError("emailAddress", "UserEmailAddress")).toBe(
    "Invalid email address.",
  );
  expect(getProdError("orgName", "Organization")).toBe(
    "Organization name can only contain underscores, dashes, and letters, and must be 3-32 characters.",
  );
  expect(getProdError("branchName", "Branch")).toBe(
    "Invalid branch name. Please refer to the help docs for branch name rules.",
  );
});
