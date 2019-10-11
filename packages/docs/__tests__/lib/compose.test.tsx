import * as React from "react";
import { _composeFactory } from "../../src/lib/compose";
import { Theme } from "../../src/lib/theme";

const compose = _composeFactory(() => undefined);

const baseComponent = () => {
  // In a function so that side effects from compose don't affect the next run
  const c: React.FunctionComponent<{}> = (props: {}) => {
    return <div />;
  };
  return c;
};

const nullTheme: Theme = {
  brandColor: "",
  brandDarkColor: ""
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

  it("sets direct render on the resulting component for recomposition", () => {
    const baseComponentInstance = baseComponent();
    const composed: any = compose(
      baseComponentInstance,
      {}
    );
    expect(composed.__directRender).toEqual(baseComponentInstance);
  });

  it("sets direct render on the resulting component for recomposition when nested", () => {
    const baseComponentInstance = baseComponent();
    const composed: any = compose(
      compose(
        compose(
          compose(
            baseComponentInstance,
            {}
          ),
          {}
        ),
        {}
      ),
      {}
    );
    expect(composed.__directRender).toEqual(baseComponentInstance);
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

  it("calls the base component with correct slot values", () => {
    const mock = jest.fn();
    const composed = compose(
      mock,
      { name: "Mock" }
    );
    composed({});
    expect(mock).toBeCalledWith({
      slots: {},
      slotProps: {}
    });
  });

  it("calls the base component with correct slot values when slots have been mixed", () => {
    const mock = jest.fn();
    const composed = compose(
      compose(
        compose(
          mock,
          { name: "Mock", slots: { foo: "foo", bar: "bar" } }
        ),
        {
          name: "Mock2",
          slots: { baz: "baz2", bar: "bar2" }
        }
      ),
      {
        name: "Mock3",
        slots: { foo: "foo3" }
      }
    );
    composed({});
    expect(mock).toBeCalledWith({
      slots: {
        foo: "foo3",
        bar: "bar2",
        baz: "baz2"
      },
      slotProps: {}
    });
  });

  it("calls the base component with correct slot values, mixing in props", () => {
    const mock = jest.fn();
    const composed = compose(
      mock,
      { name: "Mock" }
    );
    composed({ foo: "bar" });
    expect(mock).toBeCalledWith({
      slots: {},
      foo: "bar",
      slotProps: {}
    });
  });

  describe("tokens", () => {
    it("merges tokens that don't overlap (simple)", () => {
      const tokenObj = { foo: "bar" };
      const options = [{ tokens: () => tokenObj }];
      expect(compose.resolveTokens(options, nullTheme)).toEqual(tokenObj);
    });

    it("allows downstream components to override partial token definitions", () => {
      const baseTokens = { foo: "foo", bar: "bar", baz: "baz" };
      const downstreamTokens = { bar: "barDownstream" };
      const options = [
        { tokens: () => baseTokens },
        { tokens: () => downstreamTokens }
      ];
      expect(compose.resolveTokens(options, nullTheme)).toEqual({
        foo: "foo",
        bar: "barDownstream",
        baz: "baz"
      });
    });
  });
});
