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
var CommandLineSolid = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <path fill={color} d="M11.278 1.278H3.722a2.446 2.446 0 0 0-2.444 2.444v7.556a2.446 2.446 0 0 0 2.444 2.444h7.556a2.447 2.447 0 0 0 2.444-2.444V3.722a2.446 2.446 0 0 0-2.444-2.444M5.082 10.86a.665.665 0 1 1-.942-.943l1.751-1.751L4.14 6.415a.667.667 0 1 1 .943-.943l2.222 2.222c.26.26.26.683 0 .943l-2.222 2.222zm5.307.196H8.167a.667.667 0 0 1 0-1.334h2.222a.667.667 0 0 1 0 1.334"/>
      </svg>);
});
CommandLineSolid.displayName = "CommandLineSolid";
exports.default = CommandLineSolid;
