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
var Pause = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.167 1.944H2.833a.89.89 0 0 0-.889.89v9.333c0 .49.398.888.89.888h1.333c.49 0 .889-.397.889-.888V2.833a.89.89 0 0 0-.89-.889M12.167 1.944h-1.334a.89.89 0 0 0-.889.89v9.333c0 .49.398.888.89.888h1.333c.49 0 .889-.397.889-.888V2.833a.89.89 0 0 0-.89-.889"/>
      </svg>);
});
Pause.displayName = "Pause";
exports.default = Pause;
