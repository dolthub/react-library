import { last } from "lodash";

type NamedResource = {
  name: string;
};

export default function byName(o1: NamedResource, o2: NamedResource): number {
  const o1LastParam = last(o1.name.split("/"));
  const o2LastParam = last(o2.name.split("/"));

  if (!o1LastParam) {
    throw new Error(`Malformatted name: ${o1.name}`);
  }

  if (!o2LastParam) {
    throw new Error(`Malformatted name: ${o2.name}`);
  }

  return o1LastParam.localeCompare(o2LastParam);
}
