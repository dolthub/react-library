import { ResourceNameConverter } from "./ResourceNamesUtils";

/*
 * The type parameters below are perhaps a little confusing, so here's an explanation:
 *
 * `O` is intended to be an `AsObject` type, so it should always have a `name` property.
 * Therefore, we specify in the type constraint that `O extends NamedResource`.
 *
 * `P` is intended to be a params type like `OrganizationResourceParams`. There's nothing
 * that they necessarily have in common except for being object types, so the type constraint
 * is just `P extends object`.
 *
 * `T` is intended to be one of the generated resource types, e.g. `Repository`. It must have
 * a `toObject` method that takes no parameters and returns an `O`. Thus, we specify that
 * `T extends Objectable<O>`.
 *
 * `U` can be any object and defaults to {} if not specified. Its properties are passed straight
 * through. You can use this type parameter to add resource-specific utils.
 *
 */

export type NamedResource = { name: string; displayName?: string };

export type Comparator<O extends NamedResource> = (t1: O, t2: O) => number;

export type Comparators<O extends NamedResource> = {
  byName: Comparator<O>;
  byResourceName: Comparator<O>;
  [fnName: string]: Comparator<O>;
};

export type Sorter<O extends NamedResource> = (ts: O[], desc?: boolean) => O[];

export type Sorters<O extends NamedResource> = {
  [K in keyof Comparators<O>]: Sorter<O>;
};

type Objectable<O> = {
  toObject: () => O;
};

export type NamedObjectable<O extends NamedResource> = {
  getDisplayName?: () => string;
  getName: () => string;
} & Objectable<O>;

export type ResourceUtils<
  O extends NamedResource,
  T extends NamedObjectable<O>,
  P extends object,
  U extends object = object,
> = {
  cmp: Comparators<O>;
  rn: ResourceNameConverter<P>;
  sort: Sorters<O>;
  displayName: (r: T | O) => string;
  fromObject: (o: Partial<O>) => T;
} & U;
