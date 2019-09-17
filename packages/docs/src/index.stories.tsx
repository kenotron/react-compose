import * as React from "react";
import { MyButton } from "./my-button";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

export const withText = () => (
  <MyButton onClick={action("onClick")}>Hello Button</MyButton>
);

export const withEmoji = () => (
  <MyButton>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </MyButton>
);

const stories = storiesOf("MyButton", module);

stories.add("Default", withText, { info: { inline: true } });

stories.add("It has the emojis", withEmoji, { info: { inline: true } });
