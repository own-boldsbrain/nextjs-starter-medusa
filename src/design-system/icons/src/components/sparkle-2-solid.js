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
var Sparkle2Solid = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <path fill={color} d="m14.189 4.88-2.916-1.152L10.12.81C9.918.303 9.08.303 8.88.811L7.726 3.728 4.81 4.88a.668.668 0 0 0 0 1.239l2.916 1.153 1.154 2.916a.667.667 0 0 0 1.239 0l1.153-2.916 2.916-1.153a.668.668 0 0 0 0-1.24"/>
        <path fill={color} fillRule="evenodd" d="M3.722 7.944c.306 0 .573.209.647.505l.436 1.746 1.746.436a.667.667 0 0 1 0 1.293l-1.746.437-.436 1.745a.667.667 0 0 1-1.294 0l-.436-1.745-1.745-.437a.667.667 0 0 1 0-1.293l1.745-.436.436-1.746a.67.67 0 0 1 .647-.505" clipRule="evenodd"/>
      </svg>);
});
Sparkle2Solid.displayName = "Sparkle2Solid";
exports.default = Sparkle2Solid;
