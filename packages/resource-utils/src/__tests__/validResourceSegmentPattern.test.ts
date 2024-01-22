import { validBranchNamePattern } from "../validResourceSegmentPattern";
import { invalidBranchNames, validBranchNames } from "./helpers/branchNames";

const validBranchNameRegex = new RegExp(validBranchNamePattern);

test("validBranchNamePattern", () => {
  validBranchNames.forEach(bn => expect(bn).toMatch(validBranchNameRegex));
  invalidBranchNames.forEach(bn =>
    expect(bn).not.toMatch(validBranchNameRegex),
  );
});
