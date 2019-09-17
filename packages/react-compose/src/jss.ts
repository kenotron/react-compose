import jss from "jss";
import preset from "jss-preset-default";
export const initializeJss = () => {
  jss.setup(preset());
};
