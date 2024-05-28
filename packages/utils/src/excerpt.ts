// Half-width characters have a width of 1, while full-width characters, like those in Japanese and Chinese, have a width of 2.
function truncate(str: string, len: number): string {
  let truncated = "";
  let width = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    width += char.match(/[ -~]/) ? 1 : 2;
    if (width > len - 1) {
      return `${truncated}…`;
    }
    truncated += char;
  }

  return truncated;
}

export default function excerpt(str: string, len = 100): string {
  return truncate(str, len);
}
