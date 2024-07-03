import { createCustomContext } from "@dolthub/react-contexts";
import { useContextWithError } from "@dolthub/react-hooks";
import React, { ReactNode, useCallback, useMemo, useState } from "react";

type TabsContextType = {
  activeTabIndex: number;
  setActiveTabIndex: (i: number) => void;
};

export const TabsContext = createCustomContext<TabsContextType>("TabsContext");

type Props = {
  children: ReactNode;
  initialActiveIndex?: number;
  afterSetTabIndex?: (i: number) => void;
};

export function TabsProvider({
  children,
  initialActiveIndex,
  afterSetTabIndex,
}: Props) {
  const [activeTabIndex, _setActiveTabIndex] = useState(
    initialActiveIndex ?? 0,
  );

  const setActiveTabIndex = useCallback(
    (i: number) => {
      _setActiveTabIndex(i);
      if (afterSetTabIndex) {
        afterSetTabIndex(i);
      }
    },
    [afterSetTabIndex],
  );

  const value = useMemo(() => {
    return {
      activeTabIndex,
      setActiveTabIndex,
    };
  }, [activeTabIndex, setActiveTabIndex]);

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

export function useTabsContext(): TabsContextType {
  return useContextWithError(TabsContext);
}
