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
var Mastercard = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" ref={ref} {...props}>
        <path fill="#F4F4F5" d="M0 0h20v20H0z"/>
        <path fill="url(#a)" fillOpacity={0.2} d="M0 0h20v20H0z"/>
        <path fill="#FF5A00" d="M11.889 6.56H8.1v6.879h3.789z"/>
        <path fill="#EB001B" d="M8.352 10c0-1.397.65-2.638 1.648-3.44a4.28 4.28 0 0 0-2.67-.935C4.935 5.625 3 7.582 3 10s1.936 4.375 4.33 4.375c1.01 0 1.936-.352 2.67-.936A4.38 4.38 0 0 1 8.352 10"/>
        <path fill="#F79E1B" d="M17 10c0 2.418-1.936 4.375-4.33 4.375a4.28 4.28 0 0 1-2.67-.936A4.37 4.37 0 0 0 11.648 10c0-1.397-.65-2.638-1.648-3.44a4.27 4.27 0 0 1 2.67-.935C15.063 5.625 17 7.595 17 10"/>
        <defs>
          <linearGradient id="a" x1={10} x2={10} y1={0} y2={20} gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff"/>
            <stop offset={1} stopColor="#fff" stopOpacity={0}/>
          </linearGradient>
        </defs>
      </svg>);
});
Mastercard.displayName = "Mastercard";
exports.default = Mastercard;
