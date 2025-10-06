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
var Paypal = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" ref={ref} {...props}>
        <path fill="#F4F4F5" d="M0 0h20v20H0z"/>
        <path fill="url(#a)" fillOpacity={0.2} d="M0 0h20v20H0z"/>
        <path fill="#002991" d="M13.516 6.76c0 1.486-1.372 3.24-3.448 3.24H8.07l-.098.62-.466 2.98H5.02L6.515 4h4.025c1.356 0 2.422.755 2.815 1.805.113.306.168.63.16.955"/>
        <path fill="#60CDFF" d="M14.948 9.52a3.44 3.44 0 0 1-3.402 2.88h-1.388L9.58 16H7.11l.395-2.4.466-2.98.098-.62h2c2.072 0 3.446-1.753 3.446-3.24 1.02.527 1.615 1.59 1.432 2.76"/>
        <path fill="#008CFF" d="M13.515 6.76a3.3 3.3 0 0 0-1.51-.36H8.633L8.069 10h1.999c2.073 0 3.447-1.754 3.447-3.24"/>
        <defs>
          <linearGradient id="a" x1={10} x2={10} y1={0} y2={20} gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff"/>
            <stop offset={1} stopColor="#fff" stopOpacity={0}/>
          </linearGradient>
        </defs>
      </svg>);
});
Paypal.displayName = "Paypal";
exports.default = Paypal;
