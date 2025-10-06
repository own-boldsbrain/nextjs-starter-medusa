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
var Party = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m2.433 11.549 2.264-7.44a.817.817 0 0 1 1.36-.34l5.176 5.176a.817.817 0 0 1-.34 1.36l-7.441 2.264a.817.817 0 0 1-1.02-1.02zM5.724 11.876 3.95 6.56M8.6 11 6.254 3.967"/>
        <path fill={color} d="m13.824 2.185-.773-.257-.258-.773c-.083-.25-.497-.25-.58 0l-.259.773-.772.257a.307.307 0 0 0 0 .582l.772.257.258.773a.306.306 0 0 0 .58 0l.258-.773.773-.257a.307.307 0 0 0 0-.582M10.563 5.05a.613.613 0 1 0 0-1.225.613.613 0 0 0 0 1.225"/>
        <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.317 2.959c.15-.109.48-.38.672-.856.25-.623.096-1.178.045-1.34M12.042 6.683c.108-.15.38-.48.855-.672a2 2 0 0 1 1.34-.045"/>
      </svg>);
});
Party.displayName = "Party";
exports.default = Party;
