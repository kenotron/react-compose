import * as React from "react";

interface MyBaseButtonProps {
  children?: any;
  disabled?: boolean;
  classes?: {
    root?: string;
    rootDisabled?: string;
  };
}

export const MyBaseButton: React.FunctionComponent<MyBaseButtonProps> = (
  props: MyBaseButtonProps
) => {
  let resolvedClassnames = props.classes && props.classes.root;
  if (props.disabled && props.classes && props.classes.rootDisabled) {
    resolvedClassnames = resolvedClassnames + " " + props.classes.rootDisabled;
  }

  return (
    <div>
      <button className={resolvedClassnames} disabled={props.disabled}>
        {props.children}
      </button>
      <pre>{JSON.stringify(props.classes, null, 2)}</pre>
    </div>
  );
};
