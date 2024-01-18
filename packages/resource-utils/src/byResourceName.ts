type NamedResource = {
  name: string;
};

export default function byResourceName(
  o1: NamedResource,
  o2: NamedResource,
): number {
  return o1.name.localeCompare(o2.name);
}
