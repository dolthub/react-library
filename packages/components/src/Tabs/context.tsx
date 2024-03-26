import { createCustomContext } from "@dolthub/react-contexts";
import { useContextWithError } from "@dolthub/react-hooks";
import React, { ReactNode, useMemo, useState } from "react";

type TabsContextType = {
  activeTabIndex: number;
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const TabsContext = createCustomContext<TabsContextType>("TabsContext");

type Props = {
  children: ReactNode;
  initialActiveIndex?: number;
};

export function TabsProvider(props: Props) {
  const [activeTabIndex, setActiveTabIndex] = useState(
    props.initialActiveIndex ?? 0,
  );

  const value = useMemo(() => {
    return {
      activeTabIndex,
      setActiveTabIndex,
    };
  }, [activeTabIndex, setActiveTabIndex]);

  return (
    <TabsContext.Provider value={value}>{props.children}</TabsContext.Provider>
  );
}

export function useTabsContext(): TabsContextType {
  return useContextWithError(TabsContext);
}
