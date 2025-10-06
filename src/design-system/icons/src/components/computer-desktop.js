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
var ComputerDesktop = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <g stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.333} clipPath="url(#a)">
          <path d="M4.611 13.944a9.6 9.6 0 0 1 5.778 0M7.5 11.278V13.5M12.167 1.944H2.833c-.982 0-1.777.796-1.777 1.778V9.5c0 .982.795 1.778 1.777 1.778h9.334c.982 0 1.777-.796 1.777-1.778V3.722c0-.982-.796-1.778-1.777-1.778"/>
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h15v15H0z"/>
          </clipPath>
        </defs>
      </svg>);
});
ComputerDesktop.displayName = "ComputerDesktop";
exports.default = ComputerDesktop;
