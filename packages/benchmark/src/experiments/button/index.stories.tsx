import { storiesOf } from "@storybook/react";
import { MultiRender } from "../../components/multi-render/multi-render";
import * as React from "react";

import { ComposeButton } from "./compose";
import { FabricButton } from "./oufr";
import { StardustButton } from "./stardust";
import { NativeButton } from "./native";

const stories = storiesOf("experiments/button", module);
stories.add(
  "oufr",
  () => <MultiRender renderChild={n => <FabricButton text={n} />} />,
  { info: { inline: true } }
);
stories.add(
  "compose",
  () => <MultiRender renderChild={n => <ComposeButton text={n} />} />,
  { info: { inline: true } }
);
stories.add(
  "stardust",
  () => <MultiRender renderChild={n => <StardustButton text={n} />} />,
  { info: { inline: true } }
);
stories.add(
  "native",
  () => <MultiRender renderChild={n => <NativeButton text={n} />} />,
  { info: { inline: true } }
);
