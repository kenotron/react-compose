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
  it("sets options on the result", () => {
    const composed: any = compose(
      baseComponent(),
      {}
    );
    expect(composed.__optionsSet).toEqual([{}]);
  });
  it("sets complicated options on the result", () => {
    const composed: any = compose(
      baseComponent(),
      { foo: { bar: "baz" } }
    );
    expect(composed.__optionsSet).toEqual([{ foo: { bar: "baz" } }]);
  });
  it("stacks optionSets", () => {
    const composed: any = compose(
      compose(
        baseComponent(),
        { slots: { foo: "div" } }
      ),
      { slots: { bar: "baz" } }
    );
    expect(composed.__optionsSet).toEqual([
      { slots: { foo: "div" } },
      { slots: { bar: "baz" } }
    ]);
  });
  describe("resolveSlots", () => {
    it("merges slots that don't overlap (simple)", () => {
      expect(compose.resolveSlots([{ slots: { foo: "bar" } }])).toEqual({
        foo: "bar"
      });
    });
    it("merges slots that don't overlap", () => {});
    it("returns empty when no options provided", () => {
      expect(compose.resolveSlots([])).toEqual({});
    });
    it("returns empty when no slots defined in options", () => {
      expect(compose.resolveSlots([{ foo: "bar" }])).toEqual({});
    });
    it('overwrites slots that are defined "later"', () => {
      const opts = [
        { slots: { foo: "bar" } },
        { slots: { foo: "baz", button: "button" } },
        { slots: { x: "y" } }
      ];
      expect(compose.resolveSlots(opts)).toEqual({
        foo: "baz",
        button: "button",
        x: "y"
      });
    });
  });
});
