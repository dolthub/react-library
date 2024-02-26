export interface ITheme {
  [key: string]: string | undefined;
}

export interface IThemes {
  [key: string]: ITheme;
}

export interface IMappedTheme {
  [key: string]: string | null;
}
