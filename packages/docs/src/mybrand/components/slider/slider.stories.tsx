import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Slider } from "./slider";

const stories = storiesOf("mybrand/components/sliders", module);

const value = 100;
stories.add(
  "Slider",
  () => {
    return (
      <div>
        <Slider min={0} max={500} step={1} snapToStep={false} value={value} />
      </div>
    );
  },
  { info: { inline: true } }
);
