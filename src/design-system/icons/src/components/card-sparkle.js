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
var CardSparkle = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m7.5 4.61.819 2.071 2.07.819-2.07.818-.819 2.07-.819-2.07-2.07-.818 2.07-.819z"/>
        <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.278 1.056H3.722c-.982 0-1.778.796-1.778 1.777v9.334c0 .982.796 1.778 1.778 1.778h7.556c.982 0 1.778-.796 1.778-1.778V2.833c0-.981-.796-1.777-1.778-1.777"/>
      </svg>);
});
CardSparkle.displayName = "CardSparkle";
exports.default = CardSparkle;
