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
var Reduce = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.5 1.944v1.778c0 .982-.796 1.778-1.778 1.778H1.944M13.056 5.5h-1.778A1.777 1.777 0 0 1 9.5 3.722V1.944M9.5 13.056v-1.778c0-.982.796-1.778 1.778-1.778h1.778M1.944 9.5h1.778c.982 0 1.778.796 1.778 1.778v1.778"/>
      </svg>);
});
Reduce.displayName = "Reduce";
exports.default = Reduce;
