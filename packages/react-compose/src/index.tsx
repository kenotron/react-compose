import jss from 'jss';
import * as React from 'react';

import { initializeJss } from './jss';
import { Theme } from './theme';
import { useTheme } from './theme-context';

export { Theme };

const resolveWith = (func: any, obj: any) => (typeof func === 'function' ? func(obj) : func);

const _resolveRecipes = (styles: any, theme: any) => {
  const target: any = {};

  for (const name in styles) {
    const value = resolveWith(styles[name], theme);

    if (typeof value === 'object') {
      target[name] = _resolveRecipes(value, theme);
    } else {
      target[name] = value;
    }
  }

  return target;
};

function merge(a: any, b: any, c: any) {
  return { ...a, ...b, ...c };
}

const _getClasses = ({ theme, name, optionsSet }: any) => {
  initializeJss();
  let tokens: any = {};
  optionsSet.forEach((options: any) => {
    if (options && options.tokens && typeof options.tokens === 'function') {
      tokens = merge({}, tokens, options.tokens(theme));
    }
  });

  let styles: any = {};
  optionsSet.forEach((options: any) => {
    if (options && options.styles && typeof options.styles === 'function') {
      styles = merge({}, styles, options.styles(theme, tokens));
    }
  });

  const sheet = jss.createStyleSheet(styles, {
    classNamePrefix: name + '-'
  });
  sheet.attach();

  return sheet.classes;
};

export interface ComposedOptions {
  styles: any;
  tokens: any;
  name: string;
  slots: any;
  slotProps: any;
  defaultTheme: Theme;
}

export const compose = (Component: React.FunctionComponent) => {
  return (options: Partial<ComposedOptions>) => {
    const classNamesCache = new WeakMap();
    const optionsSet = [...((Component as any).__optionsSet || []), options];
    const name = options.name || Component.displayName || (Component as any).name;

    Component = (Component as any).__parentComponent || Component;

    const Result = (props: any) => {
      const theme = (useTheme() || options.defaultTheme)!;
      if (!theme) {
        console.warn('No theme specified, behavior undefined.');
      }

      if (!classNamesCache.has(theme)) {
        classNamesCache.set(theme, _getClasses({ theme, name, optionsSet }));
      }

      return Component({
        ...props,
        classes: classNamesCache.get(theme)
      });
    };

    Result.__optionsSet = optionsSet;
    Result.__parentComponent = Component;
    Result.displayName = name;

    return Result;
  };
};
