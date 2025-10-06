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
var Heart = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <g clipPath="url(#a)">
          <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.081 13.03a.9.9 0 0 0 .837 0c1.395-.727 5.803-3.366 5.803-7.655a3.42 3.42 0 0 0-3.4-3.43A3.45 3.45 0 0 0 7.5 3.472a3.45 3.45 0 0 0-2.82-1.529 3.42 3.42 0 0 0-3.401 3.43c0 4.29 4.407 6.929 5.802 7.657"/>
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h15v15H0z"/>
          </clipPath>
        </defs>
      </svg>);
});
Heart.displayName = "Heart";
exports.default = Heart;
