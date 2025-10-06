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
var ListCheckbox = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.611 4.167h5.333M8.611 10.833h5.333M1.495 4.514l1.208 1.208 3.02-3.926M4.611 9.055H2.39a.89.89 0 0 0-.889.89v2.221c0 .492.398.89.889.89H4.61c.491 0 .889-.398.889-.89V9.945a.89.89 0 0 0-.889-.889"/>
      </svg>);
});
ListCheckbox.displayName = "ListCheckbox";
exports.default = ListCheckbox;
