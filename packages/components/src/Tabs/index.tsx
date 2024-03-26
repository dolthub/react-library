import cx from "classnames";
import React, { ReactNode } from "react";
import Tab from "./Tab";
import TabList from "./TabList";
import TabPanel from "./TabPanel";
import { TabsProvider } from "./context";
import css from "./index.module.css";

type Props = {
  children: ReactNode;
  initialActiveIndex?: number;
  className?: string;
};

function Tabs({ children, ...props }: Props) {
  return (
    <TabsProvider {...props}>
      <div className={cx(css.tabs, props.className)}>{children}</div>
    </TabsProvider>
  );
}

export { Tab, TabList, TabPanel, Tabs };
