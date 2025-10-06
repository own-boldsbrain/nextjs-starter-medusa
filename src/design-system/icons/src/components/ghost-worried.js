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
var GhostWorried = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 13.945c1.278 0 1.36-1.334 2.667-1.334s1.333 1.334 2.889 1.334V6.61a5.555 5.555 0 1 0-11.112 0v7.334c1.556 0 1.584-1.334 2.89-1.334 1.305 0 1.388 1.334 2.666 1.334"/>
        <path fill={color} d="M4.833 8.389a.889.889 0 1 0 0-1.778.889.889 0 0 0 0 1.778M10.167 8.389a.889.889 0 1 0 0-1.778.889.889 0 0 0 0 1.778M8.389 10.167H6.61a.445.445 0 0 1-.444-.445 1.334 1.334 0 0 1 2.666 0c0 .245-.199.444-.444.444"/>
      </svg>);
});
GhostWorried.displayName = "GhostWorried";
exports.default = GhostWorried;
