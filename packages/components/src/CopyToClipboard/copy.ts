// Copies text to the clipboard. Prefers the async Clipboard API (available in
// secure contexts on a user gesture) and falls back to a hidden-textarea
// execCommand for older browsers. Returns true if a copy was initiated.
export default function copyToClipboard(text: string): boolean {
  // Narrow type so the runtime feature check is meaningful: lib.dom types
  // navigator.clipboard as always-present, but it can be undefined at runtime.
  const nav: { clipboard?: Clipboard } = window.navigator;
  if (nav.clipboard) {
    nav.clipboard.writeText(text).catch(() => fallbackCopy(text));
    return true;
  }
  return fallbackCopy(text);
}

function fallbackCopy(text: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }
  document.body.removeChild(textarea);
  return copied;
}
