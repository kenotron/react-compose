"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
exports.MyBaseButton = function (props) {
    var resolvedClassnames = props.classes && props.classes.root;
    if (props.disabled && props.classes && props.classes.rootDisabled) {
        resolvedClassnames = resolvedClassnames + " " + props.classes.rootDisabled;
    }
    return (<div>
      <button className={resolvedClassnames} disabled={props.disabled}>
        {props.children}
      </button>
      <pre>{JSON.stringify(props.classes, null, 2)}</pre>
    </div>);
};
//# sourceMappingURL=index.jsx.map