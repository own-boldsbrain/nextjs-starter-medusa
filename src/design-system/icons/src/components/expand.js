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
var Expand = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.5 1.944h1.778c.982 0 1.778.796 1.778 1.778V5.5M5.5 13.056H3.722a1.777 1.777 0 0 1-1.778-1.778V9.5M1.944 5.5V3.722c0-.982.796-1.778 1.778-1.778H5.5M13.056 9.5v1.778c0 .982-.796 1.778-1.778 1.778H9.5"/>
      </svg>);
});
Expand.displayName = "Expand";
exports.default = Expand;
