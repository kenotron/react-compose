import * as React from "react";
import { compose } from "../../src/lib/compose";

const baseComponent = () => {
  // In a function so that side effects from compose don't affect the next run
  const c: React.FunctionComponent<{}> = (props: {}) => {
    return <div />;
  };
  return c;
};

describe("compose", () => {
  it("returns a component", () => {
    const composed = compose(
      baseComponent(),
      {}
    );
    expect(typeof composed).toEqual("function");
  });
  it("needs tests", () => {
    expect(1).toEqual(1);
  });
});
