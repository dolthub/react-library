import cx from "classnames";
import React from "react";
import ReactLoader from "react-loader";

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
  tableLoader?: boolean;
};

export default function SmallLoader(props: Props) {
  return (
    <div className={props.className}>
      <ReactLoader
        {...props}
        // uses default options, but overrides fields provided as props
        options={{ ...smallLoaderDefaultOptions, ...props.options }}
      />
    </div>
  );
}

type WithTextProps = {
  text: string;
  outerClassName?: string;
  className?: string;
} & Props;

function WithText(props: WithTextProps) {
  // TODO(css)
  return (
    <div className={cx(props.className, props.outerClassName)}>
      <SmallLoader {...props} />
      <span>{props.text}</span>
    </div>
  );
}

SmallLoader.WithText = WithText;
