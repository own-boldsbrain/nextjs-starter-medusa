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
var Stripe = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" ref={ref} {...props}>
        <path fill="#6772E5" d="M0 0h20v20H0z"/>
        <path fill="url(#a)" fillOpacity={0.2} d="M0 0h20v20H0z"/>
        <path fill="#fff" fillRule="evenodd" d="M9.149 7.568c0-.513.427-.712 1.118-.712a7.4 7.4 0 0 1 3.277.848V4.602a8.7 8.7 0 0 0-3.277-.601C7.605 4 5.819 5.395 5.819 7.724c0 3.643 5.003 3.052 5.003 4.622 0 .614-.525.805-1.264.805-1.09 0-2.496-.451-3.6-1.05v3.14a9.1 9.1 0 0 0 3.6.759c2.737 0 4.623-1.352 4.623-3.721 0-3.932-5.032-3.23-5.032-4.71" clipRule="evenodd"/>
        <defs>
          <linearGradient id="a" x1={10} x2={10} y1={0} y2={20} gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff"/>
            <stop offset={1} stopColor="#fff" stopOpacity={0}/>
          </linearGradient>
        </defs>
      </svg>);
});
Stripe.displayName = "Stripe";
exports.default = Stripe;
