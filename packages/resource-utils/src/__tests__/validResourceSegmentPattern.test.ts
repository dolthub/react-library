import {
  validBranchNamePattern,
  validBranchProtectionNamePattern,
} from "../validResourceSegmentPattern";
import {
  invalidBranchNames,
  validBranchNames,
  validBranchProtectionNames,
  invalidBranchProtectionNames,
} from "./helpers/branchNames";

const validBranchNameRegex = new RegExp(validBranchNamePattern);
const validBranchProtectionNameRegex = new RegExp(
  validBranchProtectionNamePattern,
);

test("validBranchNamePattern", () => {
  validBranchNames.forEach(bn => expect(bn).toMatch(validBranchNameRegex));
  invalidBranchNames.forEach(bn =>
    expect(bn).not.toMatch(validBranchNameRegex),
  );
});

test("validBranchProtectionNamePattern", () => {
  validBranchProtectionNames.forEach(bn =>
    expect(bn).toMatch(validBranchProtectionNameRegex),
  );
  invalidBranchProtectionNames.forEach(bn =>
    expect(bn).not.toMatch(validBranchProtectionNameRegex),
  );
});
