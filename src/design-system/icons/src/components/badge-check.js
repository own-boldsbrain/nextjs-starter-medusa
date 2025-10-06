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
var BadgeCheck = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <path fill={color} d="M14.611 7.5a2.9 2.9 0 0 0-1.302-2.406 2.9 2.9 0 0 0-.78-2.622 2.9 2.9 0 0 0-2.623-.78A2.9 2.9 0 0 0 7.5.388 2.9 2.9 0 0 0 5.094 1.69a2.89 2.89 0 0 0-2.622.78 2.9 2.9 0 0 0-.78 2.623A2.9 2.9 0 0 0 .388 7.5 2.9 2.9 0 0 0 1.69 9.906a2.9 2.9 0 0 0 .78 2.622 2.9 2.9 0 0 0 2.623.78A2.9 2.9 0 0 0 7.5 14.612a2.9 2.9 0 0 0 2.406-1.302 2.9 2.9 0 0 0 2.622-.78c.69-.69.972-1.686.78-2.623A2.9 2.9 0 0 0 14.612 7.5m-3.695-2.037-3.778 4.889a.67.67 0 0 1-.502.258h-.025a.67.67 0 0 1-.496-.22l-2-2.222a.668.668 0 0 1 .992-.893l1.465 1.629 3.29-4.257a.667.667 0 0 1 1.055.815z"/>
      </svg>);
});
BadgeCheck.displayName = "BadgeCheck";
exports.default = BadgeCheck;
