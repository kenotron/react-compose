import { MyButton } from "@priv-compose/react-mybrand/lib/components/my-button";
import * as React from "react";

import { Props } from "./types";

export const ComposeButton: React.FunctionComponent<Props> = (props: Props) => {
  return <MyButton>{props.text}</MyButton>;
};
