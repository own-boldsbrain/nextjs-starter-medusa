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
var ListBullet = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.833 9.5H13.5M6.833 12.611H13.5M6.833 3.278H13.5M6.833 6.389H13.5M2.833 4.611a1.333 1.333 0 1 0 0-2.667 1.333 1.333 0 0 0 0 2.667M2.833 10.833a1.333 1.333 0 1 0 0-2.666 1.333 1.333 0 0 0 0 2.666"/>
      </svg>);
});
ListBullet.displayName = "ListBullet";
exports.default = ListBullet;
