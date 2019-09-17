"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jss_1 = __importDefault(require("jss"));
var theme_context_1 = require("./theme-context");
var resolveWith = function (func, obj) {
    return typeof func === "function" ? func(obj) : func;
};
var _resolveRecipes = function (styles, theme) {
    var target = {};
    for (var name in styles) {
        var value = resolveWith(styles[name], theme);
        if (typeof value === "object") {
            target[name] = _resolveRecipes(value, theme);
        }
        else {
            target[name] = value;
        }
    }
    return target;
};
function merge(a, b, c) {
    return __assign(__assign(__assign({}, a), b), c);
}
var _getClasses = function (_a) {
    var theme = _a.theme, name = _a.name, optionsSet = _a.optionsSet;
    var tokens = {};
    optionsSet.forEach(function (options) {
        if (options && options.tokens && typeof options.tokens === "function") {
            tokens = merge({}, tokens, options.tokens(theme));
        }
    });
    var styles = {};
    optionsSet.forEach(function (options) {
        if (options && options.styles && typeof options.styles === "function") {
            styles = merge({}, styles, options.styles(theme, tokens));
        }
    });
    var sheet = jss_1.default.createStyleSheet(styles, {
        classNamePrefix: name + "-"
    });
    sheet.attach();
    return sheet.classes;
};
exports.compose = function (Component) {
    return function (options) {
        var classNamesCache = new WeakMap();
        var optionsSet = __spreadArrays((Component.__optionsSet || []), [options]);
        var name = options.name || Component.displayName || Component.name;
        Component = Component.__parentComponent || Component;
        var Result = function (props) {
            var theme = theme_context_1.useTheme();
            if (!classNamesCache.has(theme)) {
                classNamesCache.set(theme, _getClasses({ theme: theme, name: name, optionsSet: optionsSet }));
            }
            return Component(__assign(__assign({}, props), { classes: classNamesCache.get(theme) }));
        };
        Result.__optionsSet = optionsSet;
        Result.__parentComponent = Component;
        Result.displayName = name;
        return Result;
    };
};
