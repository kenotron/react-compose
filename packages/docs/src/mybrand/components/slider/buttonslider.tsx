import * as React from "react";
import { SliderProps } from "../../../base/components/slider/props";
import { compose } from "../../../lib/compose";
import { Slider } from "./slider";

export const ButtonSlider = compose<SliderProps>(
  Slider as any,
  {
    name: "ButtonSlider",
    slots: {
      thumb: (props: any) => (
        <button style={{ ...props.style, position: "absolute" }}>Thumb</button>
      )
    }
  }
);
