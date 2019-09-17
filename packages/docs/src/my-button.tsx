import * as React from "react";

interface MyButtonProps {
  children?: any;
  onClick?: () => void;
}

export const MyButton: React.FunctionComponent<MyButtonProps> = (
  props: MyButtonProps
) => {
  return (
    <button onClick={props.onClick || undefined}>{props.children}!</button>
  );
};
