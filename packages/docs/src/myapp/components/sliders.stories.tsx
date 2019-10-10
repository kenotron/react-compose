import * as React from "react";
import { storiesOf } from "@storybook/react";
import { MostlyRedSlider } from "./sliders";
import { Slider } from "../../mybrand/components/slider/slider";

const stories = storiesOf("myapp/components/sliders", module);

const value = 100;
stories.add(
  "Default",
  () => {
    return (
      <div>
        <MostlyRedSlider
          min={0}
          max={500}
          step={1}
          snapToStep={false}
          value={value}
        />
        <Slider min={0} max={500} step={1} snapToStep={false} value={value} />
      </div>
    );
  },
  { info: { inline: true } }
);
