import { FromResourceOptions, ToResourceOptions } from "./ResourceNamesUtils";

// For now, the from and to options are the same, but I can easily imagine a world
// where they're not in the future, so let's keep them separately named.
const defaultFromResourceOptions = (): FromResourceOptions => {
  return {
    throwValidationError: true,
    validate: true,
  };
};
export const getFromResourceOptions = (
  o?: Partial<FromResourceOptions>,
): FromResourceOptions => Object.assign(defaultFromResourceOptions(), o);

const defaultToResourceOptions = (): ToResourceOptions => {
  return {
    throwValidationError: true,
    validate: true,
  };
};
export const getToResourceOptions = (
  o?: Partial<ToResourceOptions>,
): FromResourceOptions => Object.assign(defaultToResourceOptions(), o);
