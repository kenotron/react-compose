import { Button } from "../../mybrand/components/button/button";
import { tokens } from "../../mybrand/components/button/tokens";
import { compose } from "../../lib/compose";
import { ButtonProps } from "../../base/components/button/button";
import { Theme } from "../../lib/theme";

export const MostlyRedButton = compose<ButtonProps>(
  Button as any,
  {
    name: "MostlyRedButton",
    tokens: (theme: Theme) => {
      const baseTokens = tokens(theme); // not the ultimate API
      return {
        ...baseTokens,
        enableBackgroundColorHovered: "#900",
        enableBackgroundColor: "#f11"
      };
    }
  }
);
