import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Button } from "./button";

const stories = storiesOf("mybrand/components/button", module);

stories.add(
  "Button",
  () => {
    return (
      <div>
        <Button onClick={() => alert("clicked")}>Styled button</Button>
      </div>
    );
  },
  { info: { inline: true } }
);
