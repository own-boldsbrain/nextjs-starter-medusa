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
var HouseStar = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.056 7.008v-1.29c0-.277-.13-.539-.351-.707L8.038 1.465a.89.89 0 0 0-1.076 0L2.296 5.01a.89.89 0 0 0-.352.708v6.448c0 .981.796 1.777 1.778 1.777H6.42"/>
        <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m10.903 8.708.892 1.808 1.997.29-1.445 1.408.341 1.989-1.785-.939-1.786.939.341-1.989-1.444-1.408 1.996-.29z"/>
      </svg>);
});
HouseStar.displayName = "HouseStar";
exports.default = HouseStar;
