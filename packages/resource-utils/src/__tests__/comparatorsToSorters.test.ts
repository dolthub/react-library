import comparatorsToSorters, {
  comparatorToSorter,
  reverse,
} from "../comparatorsToSorters";
import { Comparator } from "../ResourceUtils";

type Foo = {
  resourceName: string;
  name: string;
};
const byName: Comparator<Foo> = (f1, f2) => f1.name.localeCompare(f2.name);
const byResourceName: Comparator<Foo> = (f1, f2) =>
  f1.resourceName.localeCompare(f2.resourceName);
const foo1 = {
  name: "foo",
  resourceName: "foo",
};
const foo2 = {
  name: "foo2",
  resourceName: "foo2",
};
const foo3 = {
  name: "foo3",
  resourceName: "foo3",
};

const sorted = [foo1, foo2, foo3];

it("converts a comparator to a sorter", () => {
  const sortByName = comparatorToSorter(byName);
  expect(sortByName([foo2, foo3, foo1])).toEqual(sorted);
});

it("converts multiple comparators to sorters", () => {
  const sorters = comparatorsToSorters({ byResourceName, byName });
  expect(sorters.byName([foo2, foo3, foo1])).toEqual(sorted);
  expect(sorters.byResourceName([foo3, foo1, foo2])).toEqual(sorted);
});

it("reverses comparator inputs", () => {
  const reversedByName = reverse(byName);
  expect(reversedByName(foo1, foo2)).toEqual(1);
  expect(reversedByName(foo2, foo1)).toEqual(-1);
});
