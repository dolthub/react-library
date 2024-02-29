export function rgbToHex(rgb: string): string {
  const [r, g, b] = rgb.split(", ").map(Number);
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

function componentToHex(c: number): string {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
