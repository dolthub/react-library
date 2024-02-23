import deepmerge, { ArrayMergeOptions } from "deepmerge";

export function combineArrayMerge(
  target: any[],
  source: any[],
  options?: ArrayMergeOptions | undefined,
): any[] {
  const destination = target.slice();

  source.forEach((item, index) => {
    if (typeof destination[index] === "undefined") {
      destination[index] = options?.cloneUnlessOtherwiseSpecified(
        item,
        options,
      );
    } else if (options?.isMergeableObject(item)) {
      destination[index] = deepmerge(target[index], item, options);
    } else if (target.indexOf(item) === -1) {
      destination.push(item);
    }
  });

  return destination;
}

export { deepmerge as merge };
