import * as React from "react";
import { storiesOf } from "@storybook/react";
import { MostlyRedButton } from "./buttons";

const stories = storiesOf("myapp/components/buttons", module);

stories.add(
  "Default",
  () => {
    return (
      <div>
        <MostlyRedButton>I am merely a red button</MostlyRedButton>
      </div>
    );
  },
  { info: { inline: true } }
);
