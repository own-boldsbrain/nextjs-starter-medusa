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
var FaceSmile = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <g stroke={color} clipPath="url(#a)">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 13.944a6.444 6.444 0 1 0 0-12.888 6.444 6.444 0 0 0 0 12.888"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.832 9.278a3.78 3.78 0 0 1-3.332 2 3.78 3.78 0 0 1-3.332-2"/>
          <path d="M5.722 6.222a.389.389 0 1 1 0 .778.389.389 0 0 1 0-.778ZM9.278 6.222a.389.389 0 1 1 0 .778.389.389 0 0 1 0-.778Z"/>
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h15v15H0z"/>
          </clipPath>
        </defs>
      </svg>);
});
FaceSmile.displayName = "FaceSmile";
exports.default = FaceSmile;
