import * as React from "react";
import { Provider, themes } from "@stardust-ui/react";

interface Props {
  renderChild: (key: string) => JSX.Element;
}

export const MultiRender: React.FunctionComponent<Props> = (props: Props) => {
  const [committedInstances, setCommittedInstances] = React.useState(7);
  const [stagedInstances, setStagedInstances] = React.useState(
    committedInstances
  );

  const instances: JSX.Element[] = [];
  for (let i = 0; i < committedInstances; i++) {
    instances.push(props.renderChild("" + i));
  }
  return (
    <div>
      <input
        type="text"
        value={stagedInstances}
        onChange={e => setStagedInstances(parseInt(e.target.value, 10))}
      />
      <button onClick={() => setCommittedInstances(stagedInstances)}>
        Render {stagedInstances} instances.
      </button>
      <hr />
      <Provider theme={themes.teams}>{instances}</Provider>
    </div>
  );
};
