import * as React from "react";

interface MyBaseButtonProps {
  children?: any;
  disabled?: boolean;
  classes?: {
    root?: string;
    rootDisabled?: string;
    rootEnabled?: string;
    content?: string;
  };
}

export const MyBaseButton: React.FunctionComponent<MyBaseButtonProps> = (
  props: MyBaseButtonProps
) => {
  let resolvedClassnames = props.classes && props.classes.root;
  if (props.disabled && props.classes && props.classes.rootDisabled) {
    resolvedClassnames = resolvedClassnames + " " + props.classes.rootDisabled;
  } else if (props.classes && props.classes.rootEnabled) {
    resolvedClassnames = resolvedClassnames + " " + props.classes.rootEnabled;
  }

  return (
    <div>
      <button className={resolvedClassnames} disabled={props.disabled}>
        <span className={props.classes && props.classes.content}>
          {props.children}
        </span>
      </button>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};
