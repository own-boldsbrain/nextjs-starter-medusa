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
var Shopping = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <g stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} clipPath="url(#a)">
          <path d="M8.333 4.842a1.67 1.67 0 0 0-1.307-.633H3.39c-.86 0-1.578.653-1.66 1.508l-.515 5.417a1.667 1.667 0 0 0 1.659 1.825h1.292"/>
          <path d="M8.184 7.125h3.631c.86 0 1.58.655 1.66 1.51l.312 3.334a1.667 1.667 0 0 1-1.66 1.822H7.873c-.982 0-1.751-.845-1.66-1.822l.313-3.334c.08-.856.8-1.51 1.66-1.51M3.542 4.208V2.542a1.666 1.666 0 1 1 3.333 0v1.666"/>
          <path d="M11.458 9.209v.208a1.459 1.459 0 0 1-2.916 0v-.208"/>
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h15v15H0z"/>
          </clipPath>
        </defs>
      </svg>);
});
Shopping.displayName = "Shopping";
exports.default = Shopping;
