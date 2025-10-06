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
var Newspaper = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <g stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} clipPath="url(#a)">
          <path d="M2.611 13.945a1.556 1.556 0 0 1-1.555-1.556V8.611c0-.245.199-.444.444-.444h.444"/>
          <path d="M4.167 12.389c0 .859-.697 1.556-1.556 1.556h9.556c.982 0 1.777-.796 1.777-1.778V2.833c0-.982-.795-1.777-1.777-1.777H5.944c-.982 0-1.777.795-1.777 1.777z"/>
          <path d="M11.278 3.722H6.833v2.222h4.445zM11.278 8.611H6.833M11.278 11.278H6.833"/>
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h15v15H0z"/>
          </clipPath>
        </defs>
      </svg>);
});
Newspaper.displayName = "Newspaper";
exports.default = Newspaper;
