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
var KeySolid = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <g clipPath="url(#a)">
          <path fill={color} d="M1.344 14.164a.66.66 0 0 1-.484-.21.68.68 0 0 1-.18-.498l.158-2.531a.67.67 0 0 1 .193-.43L6.01 5.518a4 4 0 0 1-.065-.685A4.227 4.227 0 0 1 10.167.611a4.227 4.227 0 0 1 4.222 4.222 4.227 4.227 0 0 1-4.222 4.223 3.8 3.8 0 0 1-.721-.072l-1.482 1.439a.67.67 0 0 1-.464.188H6.167v1.333a.67.67 0 0 1-.18.456L4.523 13.96a.67.67 0 0 1-.487.21zM11.5 4.389a.89.89 0 1 0-1.779 0 .89.89 0 0 0 1.779 0"/>
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h15v15H0z"/>
          </clipPath>
        </defs>
      </svg>);
});
KeySolid.displayName = "KeySolid";
exports.default = KeySolid;
