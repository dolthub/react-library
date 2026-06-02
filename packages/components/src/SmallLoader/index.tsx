import cx from "classnames";
import React, { CSSProperties, ReactNode } from "react";
import Spinner from "../Spinner";
import css from "./index.module.css";

const smallLoaderDefaultOptions = {
  lines: 10,
  length: 4,
  width: 1.5,
  radius: 3.5,
  scale: 1.0,
  corners: 1,
  color: "#000",
  opacity: 0.25,
  rotate: 0,
  direction: 1,
  speed: 1,
  trail: 60,
  fps: 20,
  zIndex: 2e9,
  top: "0.6rem",
  left: "0",
  shadow: false,
  hwaccel: false,
  position: "relative",
};

type Props = {
  loaded: boolean;
  className?: string;
  options?: Partial<typeof smallLoaderDefaultOptions>;
  children?: ReactNode;
};

function SmallLoader(props: Props) {
  const options = { ...smallLoaderDefaultOptions, ...props.options };

  return (
    <div className={props.className}>
      {props.loaded ? (
        props.children
      ) : (
        <Spinner
          lines={options.lines}
          length={options.length}
          width={options.width}
          radius={options.radius}
          color={options.color}
          speed={options.speed}
          opacity={options.opacity}
          style={{
            position: options.position as CSSProperties["position"],
            top: options.top,
            left: options.left,
          }}
        />
      )}
    </div>
  );
}

type WithTextProps = {
  text: string;
  outerClassName?: string;
} & Props;

function WithText(props: WithTextProps) {
  return (
    <div className={cx(css.loading, props.outerClassName)}>
      <SmallLoader {...props} />
      {!props.loaded && <span>{props.text}</span>}
    </div>
  );
}

SmallLoader.WithText = WithText;

export default SmallLoader;
