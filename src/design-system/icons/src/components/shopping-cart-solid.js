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
var ShoppingCartSolid = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <path fill={color} d="M12.267 3.056H3.736l-.157-1.064A1.55 1.55 0 0 0 2.417.71l-1.2-.3a.666.666 0 1 0-.323 1.294l1.2.3a.22.22 0 0 1 .166.183l.917 6.236a1.78 1.78 0 0 0-1.455 1.745c0 .98.798 1.777 1.778 1.777h9.556a.667.667 0 0 0 0-1.333H3.5a.445.445 0 0 1 0-.889h7.581c.67 0 1.263-.426 1.476-1.063l1.185-3.555a1.558 1.558 0 0 0-1.475-2.048M2.833 14.611a1.111 1.111 0 1 0 0-2.222 1.111 1.111 0 0 0 0 2.222M12.167 14.611a1.111 1.111 0 1 0 0-2.222 1.111 1.111 0 0 0 0 2.222"/>
      </svg>);
});
ShoppingCartSolid.displayName = "ShoppingCartSolid";
exports.default = ShoppingCartSolid;
