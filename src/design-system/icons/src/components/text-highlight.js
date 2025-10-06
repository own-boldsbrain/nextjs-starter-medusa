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
var TextHighlight = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.318 13.055h6.849M8.201 10.276 3.86 8.084a.888.888 0 0 1-.333-1.295L6.874 1.88a1.78 1.78 0 0 1 2.27-.586l1.384.699a1.78 1.78 0 0 1 .877 2.174L9.442 9.775a.89.89 0 0 1-1.24.5zM8.41 10.384a4.57 4.57 0 0 0-2.891 2.275l-.992-.5-.992-.501a4.57 4.57 0 0 0 .113-3.677"/>
        <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m5.518 12.659-.2.396H2.833l.702-1.398"/>
      </svg>);
});
TextHighlight.displayName = "TextHighlight";
exports.default = TextHighlight;
