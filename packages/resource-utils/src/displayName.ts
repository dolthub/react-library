import { last } from "lodash";
import { NamedObjectable, NamedResource } from "./ResourceUtils";

export default function displayName<O extends NamedObjectable<NamedResource>>(
  r: O | NamedResource,
): string {
  if ("getDisplayName" in r && r.getDisplayName) {
    const dn = r.getDisplayName();
    if (dn) {
      return dn;
    }
  }

  if ("displayName" in r && r.displayName) {
    return r.displayName;
  }

  const name = "getName" in r ? r.getName() : r.name;
  const shortName = last(name.split("/"));

  return shortName ?? name;
}
