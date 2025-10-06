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
var CaretMinimizeDiagonal = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <path fill={color} d="M9.462 1.407a.885.885 0 0 0-.97-.192.89.89 0 0 0-.548.82v4.132c0 .49.4.888.89.888h4.129a.887.887 0 0 0 .628-1.517zM6.167 7.944h-4.13a.887.887 0 0 0-.628 1.517l4.13 4.13a.885.885 0 0 0 .968.193.89.89 0 0 0 .549-.822v-4.13a.89.89 0 0 0-.89-.888"/>
      </svg>);
});
CaretMinimizeDiagonal.displayName = "CaretMinimizeDiagonal";
exports.default = CaretMinimizeDiagonal;
