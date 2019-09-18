type Color = string;

export interface Theme {
  brandColor: Color;
  semanticColors: {
    buttonBorder: Color;
    buttonTextPressed: Color;
    buttonTextHovered: Color;
    buttonBackgroundPressed: Color;
    buttonText: Color;
    buttonBackground: Color;
  };
  effects: {
    roundedCorner2: string;
  };
}
