// Half-width characters have a width of 1, while full-width characters, like those in Japanese and Chinese, have a width of 2.
function getWidth(char: string): number {
  return char.match(/[ -~]/) ? 1 : 2;
}

function truncate(str: string, len: number): string {
  let truncated = "";
  let width = 0;

  for (let char of str) {
    width += getWidth(char);
    if (width > len - 1) {
      return `${truncated}…`;
    }
    truncated += char;
  }

  return truncated;
}

export default function excerpt(str: string, len = 100): string {
  const width = Array.from(str).reduce((sum, char) => sum + getWidth(char), 0);
  return width <= len ? str : truncate(str, len);
}
