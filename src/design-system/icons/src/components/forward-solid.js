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
var ForwardSolid = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <g clipPath="url(#a)">
          <path fill={color} d="M14.23 6.619 8.19 3.27a1 1 0 0 0-.998.014 1 1 0 0 0-.497.867v1.862l-4.95-2.742a1 1 0 0 0-.999.013 1 1 0 0 0-.496.867v6.696c0 .36.185.685.496.867.16.094.335.142.511.142.168 0 .334-.043.487-.128l4.95-2.743v1.862c0 .36.186.685.497.867.159.094.335.142.51.142.168 0 .335-.043.488-.128l6.042-3.348a1.008 1.008 0 0 0 0-1.762"/>
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h15v15H0z"/>
          </clipPath>
        </defs>
      </svg>);
});
ForwardSolid.displayName = "ForwardSolid";
exports.default = ForwardSolid;
