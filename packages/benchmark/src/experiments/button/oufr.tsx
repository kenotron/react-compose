import * as React from "react";
import { DefaultButton } from "office-ui-fabric-react";
import { Props } from "./types";

export const FabricButton: React.FunctionComponent<Props> = (props: Props) => {
  return <DefaultButton text={props.text} />;
};
