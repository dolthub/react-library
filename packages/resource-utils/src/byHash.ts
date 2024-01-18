import { last } from "lodash";

type NamedResource = {
  name: string;
};

export default function byHash(o1: NamedResource, o2: NamedResource): number {
  const o1LastParam = last(o1.name.split("/"));
  const o2LastParam = last(o2.name.split("/"));

  if (!o1LastParam) {
    throw new Error(`Malformatted name: ${o1.name}`);
  }

  if (!o2LastParam) {
    throw new Error(`Malformatted name: ${o2.name}`);
  }

  if (o1LastParam === o2LastParam) {
    return 0;
  }
  if (o1LastParam < o2LastParam) {
    return -1;
  }
  if (o1LastParam > o2LastParam) {
    return 1;
  }
  throw new Error(`Unable to compare: ${o1.name} ${o2.name}`);
}
