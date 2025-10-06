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
var MoonSolid = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <g clipPath="url(#a)">
          <path fill={color} d="M14.349 8.587a.665.665 0 0 0-.745-.033 4.9 4.9 0 0 1-2.548.723 4.894 4.894 0 0 1-4.89-4.889c0-1.019.315-1.997.91-2.832A.667.667 0 0 0 6.41.513 7.11 7.11 0 0 0 .611 7.5c0 3.92 3.19 7.111 7.111 7.111a7.11 7.11 0 0 0 6.876-5.32.67.67 0 0 0-.25-.704"/>
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h15v15H0z"/>
          </clipPath>
        </defs>
      </svg>);
});
MoonSolid.displayName = "MoonSolid";
exports.default = MoonSolid;
