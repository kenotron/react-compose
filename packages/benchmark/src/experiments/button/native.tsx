import * as React from "react";

import { Props } from "./types";

export const NativeButton: React.FunctionComponent<Props> = (props: Props) => {
  return <button>{props.text}</button>;
};
