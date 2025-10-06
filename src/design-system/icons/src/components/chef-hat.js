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
var ChefHat = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.722 11.722h7.556M6.389 10.167v1.555M8.611 10.167v1.555M4.755 3.04a2.64 2.64 0 0 0-1.593-.149 2.675 2.675 0 0 0-2.065 2.13 2.67 2.67 0 0 0 2.625 3.146v4.888c0 .491.398.89.89.89h5.777a.89.89 0 0 0 .889-.89V8.167a2.67 2.67 0 0 0 2.625-3.144 2.675 2.675 0 0 0-2.064-2.132 2.64 2.64 0 0 0-1.594.148"/>
        <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.611 3.945a2.889 2.889 0 1 1 5.778 0"/>
      </svg>);
});
ChefHat.displayName = "ChefHat";
exports.default = ChefHat;
