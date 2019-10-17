import { TokenTypes } from "./tokens";
import { Theme } from "../../../lib/theme";

export const styles = (_: Theme, tokens: TokenTypes) => {
  return {
    root: {
      alignItems: "center",
      backgroundColor: tokens.enableBackgroundColor,
      borderColor: tokens.enableBorderColor,
      borderRadius: tokens.borderRadius,
      borderStyle: tokens.borderStyle,
      borderWidth: tokens.borderWidth,
      boxSizing: "border-box",
      color: tokens.enableColor,
      cursor: tokens.cursor,
      display: "inline-flex",
      flexDirection: "row",
      fontSize: tokens.textSize,
      fontWeight: tokens.textWeight,
      minDHheight: tokens.minHeight,
      justifyContent: "center",
      margin: 0,
      minWidth: tokens.minWidth,
      minHeight: tokens.minHeight,
      overflow: "hidden",
      padding: tokens.contentPadding,
      textAlign: "center",
      textDecoration: "none",
      userSelect: "none",
      verticalAlign: "baseline",
      "& > *": {
        /*marginLeft: `${0.5 * rowGap.value}${rowGap.unit} ${0.5 *
          columnGap.value}${columnGap.unit}`, */
        textOverflow: "ellipsis"
      },
      "& > *:not(:first-child)": {
        /* marginLeft: `${columnGap.value}${columnGap.unit}` */
      },
      "&:hover": {
        backgroundColor: tokens.enableBackgroundColorHovered,
        borderColor: tokens.enableBorderColorHovered,
        color: tokens.enableColorHovered
      },
      "&:active": {
        backgroundColor: tokens.enableBackgroundColorPressed,
        borderColor: tokens.enableBorderColorPressed,
        color: tokens.enableColorPressed
      }
    },
    content: {
      fontFamily: tokens.textFamily,
      fontSize: tokens.textSize,
      fontWeight: tokens.textWeight,
      overflow: "visible"
    }
  };
};
