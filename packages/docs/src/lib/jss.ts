import jss from "jss";
import preset from "jss-preset-default";

let initialized = false;
export const initializeJss = () => {
  if (!initialized) {
    jss.setup(preset());
  }
  initialized = true;
};
