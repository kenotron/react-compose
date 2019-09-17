"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var theme_1 = require("./theme");
exports.ThemeContext = react_1.createContext(theme_1.BlankTheme);
exports.useTheme = function () { return react_1.useContext(exports.ThemeContext); };
//# sourceMappingURL=theme-context.js.map