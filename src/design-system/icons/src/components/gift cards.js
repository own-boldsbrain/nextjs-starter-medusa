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
var GiftCards = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" ref={ref} {...props}>
        <path fill="#F97316" d="M0 0h20v20H0z"/>
        <path fill="url(#a)" fillOpacity={0.2} d="M0 0h20v20H0z"/>
        <path fill="#fff" d="M10 8.5H7.167C5.972 8.5 5 7.491 5 6.25S5.972 4 7.167 4c2.653 0 3.525 3.425 3.562 3.571A.75.75 0 0 1 10 8.5m-2.833-3c-.368 0-.667.336-.667.75s.299.75.667.75h1.75c-.332-.686-.903-1.5-1.75-1.5"/>
        <path fill="#fff" d="M12.833 8.5H10a.75.75 0 0 1-.729-.929C9.307 7.425 10.18 4 12.833 4 14.028 4 15 5.009 15 6.25s-.972 2.25-2.167 2.25M11.083 7h1.75c.368 0 .667-.336.667-.75s-.299-.75-.667-.75c-.847 0-1.418.814-1.75 1.5"/>
        <path fill="#fff" d="M15.25 8.5H4.75a.75.75 0 0 1 0-1.5h10.5a.75.75 0 0 1 0 1.5M9.25 10H5v2.75a2.75 2.75 0 0 0 2.75 2.75h1.5zM10.75 10v5.5h1.5A2.75 2.75 0 0 0 15 12.75V10z"/>
        <defs>
          <linearGradient id="a" x1={10} x2={10} y1={0} y2={20} gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff"/>
            <stop offset={1} stopColor="#fff" stopOpacity={0}/>
          </linearGradient>
        </defs>
      </svg>);
});
GiftCards.displayName = "GiftCards";
exports.default = GiftCards;
