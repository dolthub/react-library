export default function initialUppercase(s: string): string {
  const [first, ...rest] = s;
  return [first.toLocaleUpperCase(), ...rest].join("");
}
