import * as React from "react";
import { Button } from "@stardust-ui/react";
import { Props } from "./types";

export const StardustButton: React.FunctionComponent<Props> = (
  props: Props
) => {
  return <Button>{props.text}</Button>;
};
