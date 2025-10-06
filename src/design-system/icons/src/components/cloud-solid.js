"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var CloudSolid = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <path fill={color} d="M12.084 5.123c-1.355-.535-3.066-.29-4.473.951.222-1.13 2.033-2.569 3.91-2.478-.812-1.388-2.313-2.318-3.995-2.318-2.565 0-4.65 2.093-4.65 4.666q0 .167.014.336a3.33 3.33 0 0 0-1.479 5.627c.622.6 1.434.926 2.28.926h6.934c2.198 0 3.986-1.793 3.986-4a3.98 3.98 0 0 0-2.527-3.71"/>
      </svg>);
});
CloudSolid.displayName = "CloudSolid";
exports.default = CloudSolid;
