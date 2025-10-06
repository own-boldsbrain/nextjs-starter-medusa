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
var CreditCardSolid = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <g fill={color} clipPath="url(#a)">
          <path d="M14.611 4.611a2.446 2.446 0 0 0-2.444-2.444H2.833A2.446 2.446 0 0 0 .39 4.61v.667H14.61zM.389 10.389a2.446 2.446 0 0 0 2.444 2.444h9.334a2.446 2.446 0 0 0 2.444-2.444V6.61H.39zm10.444-1.556h.89a.667.667 0 0 1 0 1.334h-.89a.667.667 0 0 1 0-1.334m-7.555 0h2.666a.667.667 0 0 1 0 1.334H3.278a.667.667 0 0 1 0-1.334"/>
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h15v15H0z"/>
          </clipPath>
        </defs>
      </svg>);
});
CreditCardSolid.displayName = "CreditCardSolid";
exports.default = CreditCardSolid;
