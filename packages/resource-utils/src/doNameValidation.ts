import { getFromResourceOptions } from "./resourceNames";
import {
  FromResourceOptions,
  ResourceNameConverter,
} from "./ResourceNamesUtils";

export default function doNameValidation<T>(
  resourceName: string,
  resourceTypeName: string,
  converter: ResourceNameConverter<T>,
  o?: Partial<FromResourceOptions>,
) {
  const opts = getFromResourceOptions(o);
  if (opts.validate && !converter.validate(resourceName)) {
    const msg = `${resourceTypeName} resource name failed validation: ${resourceName}`;
    if (opts.throwValidationError) {
      throw new ResourceNameValidationError(msg);
    } else {
      console.log(msg);
    }
  }
}

export class ResourceNameValidationError extends Error {}
