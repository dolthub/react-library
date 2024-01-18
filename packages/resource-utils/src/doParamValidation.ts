import { ToResourceOptions } from "./ResourceNamesUtils";
import { getToResourceOptions } from "./resourceNames";

const initialUppercase = (str: string) =>
  str && str[0].toLocaleUpperCase() + str.slice(1);

export default function doParamValidation(
  obj: {
    [paramName: string]: string;
  },
  resourceTypeName: string,
  getValidator: (paramName: string) => (value: string) => boolean,
  o?: Partial<ToResourceOptions>,
) {
  const opts = getToResourceOptions(o);
  if (!opts.validate) {
    return;
  }
  const entries = Object.entries(obj);

  entries.forEach(([paramName, value]) => {
    const isValid = getValidator(paramName)(value);
    if (isValid) {
      return;
    }

    const msg =
      process.env.NODE_ENV === "production"
        ? getProdError(paramName, resourceTypeName)
        : `${resourceTypeName} param ${paramName} failed validation: ${value}`;

    if (opts.throwValidationError) {
      throw new ResourceParamValidationError(msg);
    } else {
      console.log(msg);
    }
  });
}

export class ResourceParamValidationError extends Error {}

export function getProdError(paramName: string, resourceTypeName: string) {
  switch (paramName) {
    case "emailAddress":
      return "Invalid email address.";
    case "branchName":
      return "Invalid branch name. Please refer to the help docs for branch name rules.";
    case "credentialId":
      return "CredentialID can only contain lowercase letters and numbers, and can be no longer than 45 characters.";
    default: {
      const friendlyTypeName = initialUppercase(
        resourceTypeName
          .split(/(?=[A-Z])/)
          .join(" ")
          .toLowerCase(),
      );
      return `${friendlyTypeName} name can only contain underscores, dashes, and letters, and must be 3-32 characters.`;
    }
  }
}
