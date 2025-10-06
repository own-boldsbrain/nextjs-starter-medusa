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
var FlyingBox = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 1.5v5.333M11.278 4.167H3.722c-.982 0-1.778.796-1.778 1.777v5.334c0 .982.796 1.777 1.778 1.777h7.556c.982 0 1.778-.795 1.778-1.777V5.944c0-.981-.796-1.777-1.778-1.777"/>
        <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m2.167 5.086 1.288-2.598c.3-.605.917-.988 1.593-.988h4.904c.676 0 1.293.383 1.593.988l1.288 2.599M4.167 10.833h1.777"/>
      </svg>);
});
FlyingBox.displayName = "FlyingBox";
exports.default = FlyingBox;
