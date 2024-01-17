const emailRegex = /\S+@\S+\.\S+/;

export function emailValidator(s: string) {
  return {
    isValid: !!s.match(emailRegex),
    errorMsg: "Email format invalid",
  };
}

const usernameRegex = /^[-a-z0-9_]{3,32}$/g;
const invalidRegex = /^-|^_|-$|_$|--|__|-_|_-/;

export function usernameValidator(s: string) {
  return {
    isValid: !!s.match(usernameRegex) && !s.match(invalidRegex),
    errorMsg:
      "Username can only contain lowercase letters, dashes, and underscores and be between 3 and 32 characters",
    detailedErrorMsg: getUsernameErrorMsg(s),
  };
}

function getUsernameErrorMsg(s: string) {
  if (s.length < 3) {
    return "Username too short";
  }
  if (s.length > 32) {
    return "Username too long";
  }
  if (s.toLowerCase() !== s) {
    return "Username cannot have uppercase letters";
  }
  if (!s.match(usernameRegex)) {
    return "Username invalid";
  }
  if (s.match(invalidRegex)) {
    return "Username invalid";
  }
  return "";
}
