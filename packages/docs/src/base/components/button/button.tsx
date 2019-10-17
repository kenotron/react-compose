import * as React from "react";

export interface ButtonProps {
  selectedKey?: any;
  defaultSelectedKey?: any;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: any;
}

export interface Slots {
  slots?: any;
  slotProps?: any;
}

interface ButtonSlotProps {
  root: any;
  content: any;
}

export const useButtonSlots: (props: ButtonProps & Slots) => ButtonSlotProps = (
  props: ButtonProps & Slots
) => {
  const resolvedProps = {
    root: {
      tabIndex: 0,
      onClick: props.onClick,
      ...((props && props.slotProps && props.slotProps.root) || {})
    },
    content: {
      ...((props && props.slotProps && props.slotProps.content) || {})
    }
  };

  return resolvedProps;
};

export const Button: React.FunctionComponent<ButtonProps> = (
  props: ButtonProps & Slots
) => {
  const { root: Root = "button", content: Content = "span" } =
    props.slots || {};
  const slotProps = useButtonSlots(props);
  return (
    <Root {...slotProps.root}>
      <Content {...slotProps.content}>{props.children}</Content>
    </Root>
  );
};
