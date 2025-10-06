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
var ScrollText = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12.611 13.5c.736 0 1.333-.597 1.333-1.333v-.89c0-.245-.199-.444-.444-.444H6.833c-.245 0-.444.2-.444.445v.889a1.334 1.334 0 0 1-2.667 0V2.833a1.334 1.334 0 0 0-2.666 0v1.778c0 .49.398.889.888.889h1.778M12.611 13.5H5.056"/>
        <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.389 1.5h8.444c.736 0 1.334.597 1.334 1.333v5.778M6.167 4.611h3.555M6.167 7.278h3.555"/>
      </svg>);
});
ScrollText.displayName = "ScrollText";
exports.default = ScrollText;
