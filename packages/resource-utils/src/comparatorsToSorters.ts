import { mapValues } from "lodash";
import {
  Comparator,
  Comparators,
  NamedResource,
  Sorter,
  Sorters,
} from "./ResourceUtils";

export default function comparatorsToSorters<T extends NamedResource>(
  cmps: Comparators<T>,
): Sorters<T> {
  return mapValues(cmps, comparatorToSorter) as Sorters<T>;
}

export function comparatorToSorter<T extends NamedResource>(
  cmpFn: Comparator<T>,
): Sorter<T> {
  return (ts: T[], desc?: boolean) => ts.sort(desc ? reverse(cmpFn) : cmpFn);
}

export function reverse<T extends NamedResource>(cmpFn: Comparator<T>) {
  return (t1: T, t2: T) => cmpFn(t2, t1);
}
