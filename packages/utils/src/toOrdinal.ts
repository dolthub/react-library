export default function toOrdinal(n: number): string {
  if (n % 10 === 1 && n % 100 !== 11) return `${n}st`;

  if (n % 10 === 2 && n % 100 !== 12) return `${n}nd`;

  if (n % 10 === 3 && n % 100 !== 13) return `${n}rd`;

  return `${n}th`;
}
