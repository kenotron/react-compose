import { compose, Theme } from '@priv-compose/react-compose';
import { MyBaseButton } from '@priv-compose/react-base/lib/components/my-base-button';
import { MyBrandTheme } from '../../theme';

export const ButtonTokens = (theme: Theme) => {
  const { effects, semanticColors } = theme;

  return {
    borderRadius: effects.roundedCorner2,
    borderWidthFocused: 3,
    borderStyle: 'solid',
    borderColorPressed: semanticColors.buttonBorder,
    colorPressed: semanticColors.buttonTextPressed,
    colorHovered: semanticColors.buttonTextHovered,
    borderWidth: 1,
    borderColor: semanticColors.buttonBorder,
    borderColorHovered: semanticColors.buttonBorder,
    color: semanticColors.buttonText,
    iconColorHovered: semanticColors.buttonTextHovered,
    outlineColor: 'transparent',
    backgroundColor: semanticColors.buttonBackground,
    backgroundColorPressed: semanticColors.buttonBackgroundPressed,
    height: 30,
    childrenGap: {
      rowGap: 8,
      columnGap: 8
    },
    contentPadding: '0px 20px',
    cursor: 'pointer',
    minHeight: 32,
    minWidth: 100,
    width: undefined,
    textFamily: 'inherit',
    textSize: 14,
    textWeight: 'strong'
  };
};

export const ButtonStyles = (theme: Theme, tokens: ReturnType<typeof ButtonTokens>) => {
  const { rowGap, columnGap } = tokens.childrenGap;

  return {
    root: {
      alignItems: 'center',
      backgroundColor: tokens.backgroundColor,
      borderColor: tokens.borderColor,
      borderRadius: tokens.borderRadius,
      borderStyle: tokens.borderStyle,
      borderWidth: tokens.borderWidth,
      boxSizing: 'border-box',
      color: tokens.color,
      cursor: tokens.cursor,
      display: 'inline-flex',
      flexDirection: 'row',
      fontSize: tokens.textSize,
      fontWeight: tokens.textWeight,
      height: tokens.height,
      justifyContent: 'center',
      margin: 0,
      minWidth: tokens.minWidth,
      minHeight: tokens.minHeight,
      outlineColor: tokens.outlineColor,
      overflow: 'hidden',
      padding: tokens.contentPadding,
      textAlign: 'center',
      textDecoration: 'none',
      userSelect: 'none',
      verticalAlign: 'baseline',
      width: tokens.width,

      '& > *': {
        marginLeft: `${0.5 * rowGap}px ${0.5 * columnGap}px`,
        textOverflow: 'ellipsis'
      },
      '& > *:not(:first-child)': {
        marginLeft: `${columnGap}px`
      },

      '&:hover': {
        backgroundColor: tokens.backgroundColorPressed,
        borderColor: tokens.borderColorHovered,
        color: tokens.colorHovered
      },
      '&:active': {
        backgroundColor: tokens.backgroundColorPressed,
        borderColor: tokens.borderColorPressed,
        color: tokens.colorPressed
      }
    },
    content: {
      fontFamily: tokens.textFamily,
      fontSize: tokens.textSize,
      fontWeight: tokens.textWeight,
      overflow: 'visible'
    }
  };
};

export const MyButton = compose(MyBaseButton)({
  name: 'MyThemedButton',
  styles: ButtonStyles,
  tokens: ButtonTokens,
  defaultTheme: MyBrandTheme
});
