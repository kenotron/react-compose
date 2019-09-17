"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jss_1 = __importDefault(require("jss"));
var jss_preset_default_1 = __importDefault(require("jss-preset-default"));
exports.initializeJss = function () {
    jss_1.default.setup(jss_preset_default_1.default());
};
//# sourceMappingURL=jss.js.map