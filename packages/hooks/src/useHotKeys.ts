import React, { ReactNode, useEffect, useState } from "react";

// KeyMap maps an action name to one or more key combos ("meta+shift+enter").
export type KeyMap = Record<string, string | string[]>;

// Handlers maps an action name to the function invoked when its combo fires.
export type HotKeyHandlers = Record<string, (keyEvent?: KeyboardEvent) => void>;

type ReturnType = {
  keyMap?: KeyMap;
  handlers: HotKeyHandlers;
};

export function useHotKeysForToggle(toggle: () => void): ReturnType {
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    if (toggling) {
      toggle();
      setToggling(false);
    }
  }, [toggling, setToggling, toggle]);

  return {
    keyMap: { TOGGLE_EDITOR: ["meta+shift+enter", "ctrl+shift+enter"] },
    handlers: { TOGGLE_EDITOR: () => setToggling(true) },
  };
}

const MODIFIERS = new Set([
  "meta",
  "cmd",
  "command",
  "ctrl",
  "control",
  "shift",
  "alt",
  "option",
]);

function normalizeKey(key: string): string {
  const k = key.toLowerCase();
  if (k === "esc") return "escape";
  if (k === "return") return "enter";
  if (k === "spacebar" || k === " ") return "space";
  return k;
}

// matchesCombo returns true when a "+"-separated combo (e.g. "meta+shift+enter")
// exactly describes the modifier state and key of a keyboard event.
function matchesCombo(combo: string, e: KeyboardEvent): boolean {
  const parts = combo
    .toLowerCase()
    .split("+")
    .map(p => p.trim())
    .filter(Boolean);

  const wantMeta =
    parts.includes("meta") ||
    parts.includes("cmd") ||
    parts.includes("command");
  const wantCtrl = parts.includes("ctrl") || parts.includes("control");
  const wantShift = parts.includes("shift");
  const wantAlt = parts.includes("alt") || parts.includes("option");

  if (
    wantMeta !== e.metaKey ||
    wantCtrl !== e.ctrlKey ||
    wantShift !== e.shiftKey ||
    wantAlt !== e.altKey
  ) {
    return false;
  }

  const key = parts.filter(p => !MODIFIERS.has(p)).pop();
  if (!key) return true;
  return normalizeKey(e.key) === normalizeKey(key);
}

type GlobalHotKeysProps = {
  keyMap?: KeyMap;
  handlers?: HotKeyHandlers;
  children?: ReactNode;
};

// GlobalHotKeys binds the given keyMap/handlers to document-level keydown events
// for as long as it is mounted, regardless of focus. Drop-in replacement for the
// unmaintained react-hotkeys component for the combos this library uses.
export function GlobalHotKeys({
  keyMap,
  handlers,
  children,
}: GlobalHotKeysProps) {
  useEffect(() => {
    if (!keyMap || !handlers) return undefined;

    const onKeyDown = (e: KeyboardEvent) => {
      Object.entries(keyMap).forEach(([action, combos]) => {
        if (!(action in handlers)) return;
        const list = Array.isArray(combos) ? combos : [combos];
        if (list.some(combo => matchesCombo(combo, e))) {
          e.preventDefault();
          handlers[action](e);
        }
      });
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [keyMap, handlers]);

  return React.createElement(React.Fragment, null, children);
}
