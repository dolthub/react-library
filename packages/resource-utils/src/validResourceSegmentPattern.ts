const validResourceSegmentPattern = "[-a-zA-Z0-9_]{3,32}";
const validClientCredentialIdPattern = "[0-9a-v]{45}";
const validEmailPattern =
  "[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*";
const validEmailOrResourcePattern = `(${validEmailPattern}|${validResourceSegmentPattern})`;
const validNumberPattern = "[1-9][0-9]*";
const validLongResourcePattern = "[-a-zA-Z0-9_]{3,36}";
const validUuidPattern = "[a-f0-9-]{36}";
const validBackupIdPattern = "[0-9]{8}T[0-9]{6}.[0-9]{3}";

// Removed ?,^, [, \, * from invalidBranchNamePattern as they are allowed in fnmatch
const invalidBranchProtectionNamePattern = [
  `:`,
  `~`,
  ` `,
  `\t`,
  `[\x00-\x1f]`,
  `\x7f`,
  `^\\.`,
  `/\\.`,
  `\\.lock$`,
  `\\.lock/`,
  `^$`,
  `^-$`,
  `\\.\\.`,
  `@{`,
  `//`,
  `^/`,
  `/$`,
].join("|");

const invalidBranchNamePattern = [`\\?`,`\\^`,`\\[`,  `\\\\`,  `\\*`,invalidBranchProtectionNamePattern].join("|");



const invertRegexPattern = (p: string) => `^(?!.*(${p}))`;
const validBranchNamePattern = invertRegexPattern(invalidBranchNamePattern);
const validBranchProtectionNamePattern = invertRegexPattern(
  invalidBranchProtectionNamePattern,
);

export {
  validBackupIdPattern,
  validBranchNamePattern,
  validClientCredentialIdPattern,
  validEmailOrResourcePattern,
  validEmailPattern,
  validLongResourcePattern,
  validNumberPattern,
  validResourceSegmentPattern,
  validUuidPattern,
  validBranchProtectionNamePattern,
};
