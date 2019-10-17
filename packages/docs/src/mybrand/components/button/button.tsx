import { compose } from "../../../lib/compose";
import {
  Button as BaseButton,
  ButtonProps
} from "../../../base/components/button/button";
import { tokens } from "./tokens";
import { styles } from "./styles";
import { FluentTheme } from "./../../theme/FluentTheme";

export const Button = compose<ButtonProps>(
  BaseButton as any,
  {
    name: "Button",
    styles,
    tokens,
    defaultTheme: FluentTheme
  }
);
