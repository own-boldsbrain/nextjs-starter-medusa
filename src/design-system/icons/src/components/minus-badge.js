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
var MinusBadge = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <circle cx={7.5} cy={7.5} r={7.5} fill="#E11D48"/>
        <circle cx={7.5} cy={7.5} r={7.5} fill="url(#a)" fillOpacity={0.2}/>
        <circle cx={7.5} cy={7.5} r={7.25} stroke={color} strokeOpacity={0.24} strokeWidth={0.5}/>
        <path fill="#fff" d="M10.547 8.25H4.453c-.388 0-.703-.336-.703-.75s.315-.75.703-.75h6.094c.388 0 .703.336.703.75s-.315.75-.703.75"/>
        <defs>
          <linearGradient id="a" x1={7.5} x2={7.5} y1={0} y2={15} gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff"/>
            <stop offset={1} stopColor="#fff" stopOpacity={0}/>
          </linearGradient>
        </defs>
      </svg>);
});
MinusBadge.displayName = "MinusBadge";
exports.default = MinusBadge;
