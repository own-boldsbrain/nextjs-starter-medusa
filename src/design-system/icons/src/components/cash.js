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
var Cash = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <g stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} clipPath="url(#a)">
          <path d="M8.624 5.918c-.286-.462-.743-.573-1.098-.573-.374 0-1.357.2-1.265 1.142.064.663.688.909 1.233 1.006s1.337.305 1.356 1.103c.017.675-.59 1.135-1.323 1.135-.608 0-1.055-.204-1.286-.661M7.5 4.833v.512M7.5 9.732v.435M3.944 2.833a2.89 2.89 0 0 1-2.888 2.89M11.056 2.833a2.89 2.89 0 0 0 2.888 2.89M3.944 12.167a2.89 2.89 0 0 0-2.888-2.89M11.056 12.167a2.89 2.89 0 0 1 2.888-2.89"/>
          <path d="M12.167 2.833H2.833c-.982 0-1.777.796-1.777 1.778v5.778c0 .982.795 1.778 1.777 1.778h9.334c.982 0 1.777-.796 1.777-1.778V4.61c0-.982-.796-1.778-1.777-1.778"/>
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h15v15H0z"/>
          </clipPath>
        </defs>
      </svg>);
});
Cash.displayName = "Cash";
exports.default = Cash;
