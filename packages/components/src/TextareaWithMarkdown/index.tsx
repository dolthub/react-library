import cx from "classnames";
import React from "react";
import Markdown from "../Markdown";
import { Tab, TabList, TabPanel, Tabs } from "../Tabs";
import Textarea from "../Textarea";
import css from "./index.module.css";

type Props = {
  value: string;
  label?: string;
  rows: number;
  placeholder?: string;
  onChange: (c: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  maxLength?: number;
  inputref?: React.RefObject<HTMLTextAreaElement>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => Promise<void>;
  ["aria-label"]?: string;
  className?: string;
  name?: string;

  hasMaxHeight?: boolean; // forModal
  hasMinHeight?: boolean; // tallForm
  separateTabs?: boolean; // mobileComment
  unroundBottom?: boolean;
  unroundTop?: boolean;
};

export default function TextareaWithMarkdown({
  onChange,
  className,
  hasMaxHeight = false,
  unroundBottom = false,
  unroundTop = false,
  separateTabs = false,
  hasMinHeight = false,
  label,
  ...props
}: Props) {
  return (
    <div>
      {label && <div className={css.label}>{label}</div>}
      <div
        className={cx(css.outerContainer, className, {
          [css.outerSeparate]: separateTabs,
          [css.outerUnroundedBottom]: unroundBottom,
          [css.outerUnroundedTop]: unroundTop,
        })}
      >
        <Tabs>
          <TabList className={css.tabList}>
            <Tab index={0} name="markdown-write">
              Write
            </Tab>
            <Tab index={1} name="markdown-preview">
              Preview
            </Tab>
          </TabList>

          <TabPanel index={0}>
            <div className={css.container}>
              <Textarea
                {...props}
                onChangeString={onChange}
                className={cx(css.textarea, {
                  [css.textareaMaxHeight]: hasMaxHeight,
                  [css.textareaMinHeight]: hasMinHeight,
                  [css.textareaSeparate]: separateTabs,
                })}
                dir="auto"
                light
                noMaxWidth
              />
            </div>
          </TabPanel>
          <TabPanel index={1}>
            <Markdown
              value={props.value}
              className={cx(css.markdown, {
                [css.textareaSeparate]: separateTabs,
              })}
              hasMaxHeight={hasMaxHeight}
            />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
