import { useEffect, useState } from "react";
import { KeyMap } from "react-hotkeys";

type ReturnType = {
  keyMap: KeyMap | undefined;
  handlers: {
    [key: string]: (keyEvent?: KeyboardEvent | undefined) => void;
  };
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

export { GlobalHotKeys } from "react-hotkeys";
