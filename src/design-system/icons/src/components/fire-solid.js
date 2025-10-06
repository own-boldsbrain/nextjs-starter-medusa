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
var FireSolid = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <path fill={color} d="M11.1 4.316a.647.647 0 0 0-1.002.216 4.2 4.2 0 0 1-.704.975C8.935 1.709 6.414.319 6.297.257A.646.646 0 0 0 5.348.8c-.095 2.35-.85 3.396-1.65 4.503-.683.945-1.388 1.922-1.576 3.618-.154 1.389.26 2.707 1.166 3.71 1.01 1.12 2.528 1.758 4.169 1.758h.049c2.315-.018 4.194-.914 5.154-2.458 1.463-2.351.792-5.625-1.56-7.615m-1.665 7.851c-.394.58-1.078.927-1.83.93h-.019c-1.142 0-2.024-.537-2.422-1.476-.544-1.282-.088-3.086 1.087-4.29a.645.645 0 0 1 1.106.395c.084.987.37 1.114.89 1.346.442.197 1.047.466 1.365 1.282.245.626.181 1.286-.177 1.813"/>
      </svg>);
});
FireSolid.displayName = "FireSolid";
exports.default = FireSolid;
