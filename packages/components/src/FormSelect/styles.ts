import colors from "../tailwind/theme/base/colors";
import { OptionTypeBase, PartialStylesConfig } from "./types";

const customStyles = <T, Q extends OptionTypeBase<T>, IsMulti extends boolean>(
  mono?: boolean,
  light?: boolean,
  small?: boolean,
  pill?: boolean,
  transparentBorder?: boolean,
  blue?: boolean,
  rounded?: boolean,
): PartialStylesConfig<T, Q, IsMulti> => {
  return {
    placeholder: styles => {
      return {
        ...styles,
        color: blue ? colors.sky["400"] : colors.storm["200"],
        fontSize: getFontSize(small, mono, rounded),
        fontFamily: getFontFamily(mono),
        fontWeight: 400,
      };
    },
    control: (styles, { isFocused }) => {
      return {
        ...styles,
        backgroundColor: isFocused || light ? "white" : colors.stone["50"],
        borderRadius: getBorderRadius(pill, rounded),
        width: transparentBorder && !small ? "10rem" : "",
        borderColor: getBorderColor(isFocused, blue, transparentBorder),
        boxShadow: "none",
        maxHeight: small ? "30px" : styles.maxHeight,
        minHeight: small ? "30px" : styles.minHeight,
        fontSize: getFontSize(small, mono, rounded),
        fontFamily: getFontFamily(mono),
        "&:hover": {
          borderColor: transparentBorder ? "transparent" : getColor(true),
        },
      };
    },
    dropdownIndicator: styles => {
      return {
        ...styles,
        color: blue ? colors.sky["600"] : getRGBVar("primary"),
        paddingTop: small ? "3px" : styles.paddingTop,
      };
    },
    indicatorSeparator: styles => {
      return {
        ...styles,
        marginBottom: small ? "4px" : styles.marginBottom,
        marginTop: small ? "4px" : styles.marginTop,
      };
    },
    indicatorsContainer: styles => {
      return {
        ...styles,
        height: small ? "28px" : styles.height,
      };
    },
    input: styles => {
      return {
        ...styles,
        color: getRGBVar("primary"),
        fontSize: getFontSize(small, mono, rounded),
        fontFamily: getFontFamily(mono),
      };
    },
    option: (styles, { isFocused, isSelected, isDisabled }) => {
      return {
        ...styles,
        display: "flex",
        alignItems: "center",
        color: isDisabled ? colors.storm["200"] : getRGBVar("primary"),
        backgroundColor:
          isFocused || isSelected ? colors.stone["50"] : undefined,
        fontFamily: getFontFamily(mono),
        fontSize: getFontSize(small, mono, rounded),
      };
    },
    singleValue: styles => {
      return {
        ...styles,
        color: blue ? colors.sky["600"] : getRGBVar("primary"),
        fontFamily: getFontFamily(mono),
        fontSize: getFontSize(small, mono, rounded),
        top: small ? "45%" : styles.top,
      };
    },
    multiValue: styles => {
      return {
        ...styles,
        color: blue ? colors.sky["600"] : getRGBVar("primary"),
        fontFamily: getFontFamily(mono),
        fontSize: getFontSize(small, mono, rounded),
        top: small ? "45%" : styles.top,
        backgroundColor: light ? colors.stone["50"] : "white",
        borderWidth: "1px",
        borderColor: colors.stone["100"],
      };
    },
    menu: styles => {
      return {
        ...styles,
        color: getRGBVar("primary"),
        fontFamily: getFontFamily(mono),
        fontSize: getFontSize(small, mono, rounded),
      };
    },
  };
};

const mobileLightStyles = <
  T,
  Q extends OptionTypeBase<T>,
  IsMulti extends boolean = false,
>(): PartialStylesConfig<T, Q, IsMulti> => {
  return {
    container: styles => {
      return {
        ...styles,
        marginLeft: "0.25rem",
        marginRight: "0.25rem",
        marginBottom: "1rem",
      };
    },
    placeholder: styles => {
      return {
        ...styles,
        color: getRGBVar("link-1"),
        width: "48%",
      };
    },
    control: styles => {
      return {
        ...styles,
        backgroundColor: "white",
        borderColor: "rgba(225, 229, 231, 1)",
      };
    },
    menu: styles => {
      return {
        ...styles,
        color: getRGBVar("link-1"),
        fontWeight: 600,
      };
    },
    singleValue: styles => {
      return {
        ...styles,
        color: getRGBVar("link-1"),
        fontWeight: 600,
      };
    },
    dropdownIndicator: styles => {
      return {
        ...styles,
        color: getRGBVar("link-1"),
      };
    },
  };
};

const mobileDarkStyles = <
  T,
  Q extends OptionTypeBase<T>,
  IsMulti extends boolean = false,
>(): PartialStylesConfig<T, Q, IsMulti> => {
  return {
    placeholder: styles => {
      return {
        ...styles,
        color: "#FFFFFFE5",
      };
    },
    control: styles => {
      return {
        ...styles,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        marginTop: "1rem",
      };
    },
    menu: styles => {
      return {
        ...styles,
        color: colors.storm["500"],
      };
    },
    singleValue: styles => {
      return {
        ...styles,
        color: "#FFFFFFE5",
      };
    },
    dropdownIndicator: styles => {
      return {
        ...styles,
        color: "#FFFFFF",
      };
    },
  };
};

export const getCustomStyles = <
  T,
  Q extends OptionTypeBase<T>,
  IsMulti extends boolean = false,
>(
  mono?: boolean,
  light?: boolean,
  small?: boolean,
  pill?: boolean,
  transparentBorder?: boolean,
  blue?: boolean,
  rounded?: boolean,
  isMobile?: boolean,
): PartialStylesConfig<T, Q, IsMulti> => {
  if (isMobile) {
    return light ? mobileLightStyles() : mobileDarkStyles();
  }
  return customStyles(
    mono,
    light,
    small,
    pill,
    transparentBorder,
    blue,
    rounded,
  );
};

function getColor(isFocused: boolean, blue?: boolean): string {
  if (blue) {
    return isFocused ? colors.sky["600"] : colors.sky["400"];
  }
  return isFocused ? colors.storm["200"] : colors.stone["100"];
}

function getBorderRadius(pill?: boolean, rounded?: boolean): string {
  if (pill) return "9999px";
  return rounded ? "8px" : "0.25rem";
}

function getFontSize(
  small?: boolean,
  mono?: boolean,
  rounded?: boolean,
): string {
  if (mono) return rounded ? "14px" : "11px";
  return small ? "12px" : "14px";
}

function getFontFamily(mono?: boolean): string {
  return mono
    ? "Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace"
    : "Source Sans Pro";
}

function getBorderColor(
  isFocused: boolean,
  blue?: boolean,
  transparent?: boolean,
): string {
  if (transparent) return "transparent";
  if (blue) {
    return isFocused ? getRGBVar("link-1") : getRGBVar("link-2");
  }
  return isFocused ? colors.storm["200"] : colors.stone["100"];
}

function getRGBVar(colorName: string): string {
  return `rgb(var(--color-${colorName}))`;
}
