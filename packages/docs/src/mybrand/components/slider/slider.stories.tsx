import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ButtonSlider } from "./buttonslider";

const stories = storiesOf("mybrand/components/sliders", module);

const value = 100;
stories.add(
  "ButtonSlider",
  () => {
    return (
      <div>
        <h3>Why would you do this?</h3>
        <ButtonSlider
          min={0}
          max={500}
          step={1}
          snapToStep={false}
          value={value}
        />
      </div>
    );
  },
  { info: { inline: true } }
);
