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
var MarkdownSolid = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <path fill={color} d="M12.708 2.5H2.292A2.294 2.294 0 0 0 0 4.792v5.416A2.294 2.294 0 0 0 2.292 12.5h10.416A2.294 2.294 0 0 0 15 10.208V4.792A2.294 2.294 0 0 0 12.708 2.5M7.917 9.375a.625.625 0 0 1-1.25 0V7.041l-.963 1.256c-.236.308-.756.308-.991 0L3.75 7.04v2.334a.625.625 0 0 1-1.25 0v-3.75c0-.345.28-.625.625-.625h.328c.195 0 .379.09.496.245l1.26 1.644 1.259-1.644A.63.63 0 0 1 6.963 5h.329c.345 0 .625.28.625.625zm5.025-1.017-1.459 1.459a.623.623 0 0 1-.883 0L9.142 8.358a.625.625 0 1 1 .884-.884l.392.392V5.625a.625.625 0 0 1 1.25 0v2.24l.391-.39a.625.625 0 1 1 .884.883z"/>
      </svg>);
});
MarkdownSolid.displayName = "MarkdownSolid";
exports.default = MarkdownSolid;
