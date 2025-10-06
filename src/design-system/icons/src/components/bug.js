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
var Bug = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <g stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} clipPath="url(#a)">
          <path d="M7.5 13.056v-4M5.5 4.611V3.5a2 2 0 1 1 4 0v1.111M3.722 8.167H1.056M3.722 5.944A2.444 2.444 0 0 1 1.278 3.5M3.722 10.389a2.444 2.444 0 0 0-2.444 2.444M11.278 8.167h2.666M11.278 5.944A2.444 2.444 0 0 0 13.722 3.5M11.278 10.389a2.444 2.444 0 0 1 2.444 2.444"/>
          <path d="M5.5 4.611h4c.981 0 1.778.797 1.778 1.778v2.889A3.78 3.78 0 0 1 7.5 13.056a3.78 3.78 0 0 1-3.778-3.778v-2.89c0-.98.797-1.777 1.778-1.777"/>
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h15v15H0z"/>
          </clipPath>
        </defs>
      </svg>);
});
Bug.displayName = "Bug";
exports.default = Bug;
