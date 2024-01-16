const truncate = (str: string, len: number): string =>
  `${str.slice(0, len - 1)}…`;

export default function excerpt(str: string, len = 100): string {
  return str.length < len ? str : truncate(str, len);
}
