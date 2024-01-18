export type FromResourceOptions = {
  validate?: boolean;
  throwValidationError?: boolean;
};

// For now, these are the same, but I can easily imagine a world where they're not
// in the future, so let's keep them separately named.
export type ToResourceOptions = FromResourceOptions;

export type ResourceNameConverter<T> = {
  toParams: (resourceName: string, opts?: Partial<FromResourceOptions>) => T;
  fromParams: (resourceParams: T, opts?: Partial<ToResourceOptions>) => string;
  validate: (resourceName: string) => boolean;
  getValidationRegex: () => RegExp;
  getValidationPattern: () => string;
};
