import React from "react";
import ReactLoader from "react-loader";
import { useThemeContext } from "../tailwind/context";
import { staticColors } from "../tailwind/theme/base/colors";
import { IThemeColors } from "../tailwind/types";
import { Color } from "./types";

const loaderDefaultOptions = {
  lines: 100,
  length: 1,
  width: 1,
  radius: 4.5,
  scale: 1.5,
  corners: 1,
  opacity: 0.25,
  rotate: 0,
  direction: 1,
  speed: 0.75,
  trail: 30,
  fps: 20,
  zIndex: 2e9,
  shadow: false,
  hwaccel: false,
  position: "absolute",
  fadeColor: "transparent",
};

type Props = {
  loaded: boolean;
  color?: Color;
};

export default function ButtonLoader(props: Props) {
  const { convertThemeRGBToHex } = useThemeContext();
  return (
    <ReactLoader
      {...props}
      // uses default options, but overrides fields provided as props
      options={{
        ...loaderDefaultOptions,
        color:
          getLoaderTailwindColor(convertThemeRGBToHex(), props.color) ?? "#fff",
      }}
    />
  );
}

function getLoaderTailwindColor(
  convertedHex: IThemeColors,
  color?: Color,
): string | undefined {
  if (!color) return undefined;
  switch (color) {
    case "default":
      return convertedHex["button-1"];
    case "dark":
      return convertedHex.primary;
    case "red":
      return staticColors["acc-red"];
    case "green":
      return staticColors["acc-green"];
    default:
      return "#fff";
  }
}
