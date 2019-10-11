import jss from "jss";
import * as React from "react";

import { initializeJss } from "./jss";
import { Theme } from "./theme";
import { useTheme } from "./theme-context";

type Options = any;
type SlotsAssignment = any;
type Tokens = any;

/** _composeFactory returns a compose function.
 * This allows tests to override aspects of compose.
 *
 * @internal
 */
export const _composeFactory = (themeHook: any = useTheme) => {
  const compose = <TProps = {}>(
    baseComponent: React.SFC,
    options?: Options
  ) => {
    const classNamesCache = new WeakMap();
    let optionsSet = [options];
    if (baseComponent && (baseComponent as any).__optionsSet) {
      optionsSet = [...(baseComponent as any).__optionsSet, options];
    }

    const renderFn = (baseComponent as any).__directRender || baseComponent;

    let mergedOptions = {};
    const slots = resolveSlots(optionsSet);
    optionsSet.forEach(o => {
      mergedOptions = { ...mergedOptions, ...o };
    });

    const Component = (props: TProps) => {
      const theme: Theme = (themeHook || (mergedOptions as any).defaultTheme)!;
      if (!theme) {
        console.warn("No theme specified, behavior undefined."); // eslint-disable-line no-console
      }

      const resolvedSlotProps = _getSlotProps(
        options.name || "WARNING-UNNAMED",
        props,
        theme,
        classNamesCache,
        optionsSet
      );

      return renderFn({
        ...props,
        slotProps: resolvedSlotProps,
        slots
      } as any);
    };

    for (const slotName in options.slots) {
      (Component as any)[slotName] = options.slots[slotName];
    }

    Component.__optionsSet = optionsSet;
    Component.__directRender =
      (baseComponent as any).__directRender || baseComponent;
    Component.displayName = options.name || "Composed Component";

    return Component;
  };

  const resolveTokens = (optionsSet: Options[], theme: Theme): Tokens => {
    let tokens: any = {};
    optionsSet.forEach((options: any) => {
      if (options && options.tokens && typeof options.tokens === "function") {
        tokens = { ...tokens, ...options.tokens(theme) };
      }
    });
    return tokens;
  };

  const resolveSlots = (optionsSet: Options[]): SlotsAssignment => {
    const result = {};
    if (optionsSet && optionsSet.length > 0) {
      optionsSet.forEach(os => {
        if (os.slots) {
          Object.keys(os.slots).forEach(k => {
            result[k] = os.slots[k];
          });
        }
      });
    }
    return result;
  };

  compose.resolveTokens = resolveTokens;
  compose.resolveSlots = resolveSlots;
  return compose;
};

/**
 * Composed allows you to create composed components, which
 * have configurable, themable state, view, and slots.
 *
 * Composed components can be recomposed.
 */
export const compose = _composeFactory();

function _getSlotProps(
  name: string,
  props: any,
  theme: Theme,
  classNamesCache: WeakMap<any, any>,
  optionsSet: any[]
) {
  const resolvedSlotProps =
    props && props.slotProps ? { ...props.slotProps } : {};
  if (theme) {
    if (!classNamesCache.has(theme)) {
      classNamesCache.set(theme, _getClasses(name, theme, optionsSet));
    }
    const classNames = classNamesCache.get(theme);
    Object.keys(classNames).forEach(k => {
      const className = classNames[k];
      if (!resolvedSlotProps[k]) {
        resolvedSlotProps[k] = { className: "" };
      } else if (!resolvedSlotProps[k].className) {
        resolvedSlotProps[k].className = "";
      }
      resolvedSlotProps[
        k
      ].className = `${resolvedSlotProps[k].className} ${className}`.trim();
    });
  }
  return resolvedSlotProps;
}

const _getClasses = (name: string, theme: Theme, optionsSet: any[]) => {
  initializeJss();

  let tokens: any = {};
  optionsSet.forEach((options: any) => {
    if (options && options.tokens && typeof options.tokens === "function") {
      tokens = { ...tokens, ...options.tokens(theme) };
    }
  });

  let styles: any = {};
  optionsSet.forEach((options: any) => {
    if (options && options.styles && typeof options.styles === "function") {
      styles = { ...styles, ...options.styles(theme, tokens) };
    }
  });

  const sheet = jss.createStyleSheet(styles, {
    classNamePrefix: name + "-"
  });
  sheet.attach();
  return sheet.classes;
};
