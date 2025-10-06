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
var Github = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" ref={ref} {...props}>
        <path fill="#000" d="M0 0h20v20H0z"/>
        <path fill="url(#a)" fillOpacity={0.6} d="M0 0h20v20H0z"/>
        <path fill="#fff" fillRule="evenodd" d="M10 4.148c-3.315 0-6 2.685-6 6a6 6 0 0 0 4.102 5.692c.3.053.413-.127.413-.285 0-.142-.008-.615-.008-1.117-1.507.277-1.897-.368-2.017-.705-.067-.173-.36-.705-.615-.848-.21-.112-.51-.39-.008-.397.473-.008.81.435.923.615.54.907 1.403.652 1.747.495.053-.39.21-.653.383-.803-1.335-.15-2.73-.667-2.73-2.962 0-.653.232-1.193.615-1.613-.06-.15-.27-.765.06-1.59 0 0 .502-.157 1.65.615.48-.135.99-.202 1.5-.202s1.02.067 1.5.202c1.147-.78 1.65-.615 1.65-.615.33.825.12 1.44.06 1.59.383.42.615.953.615 1.613 0 2.302-1.402 2.812-2.738 2.962.218.188.406.548.406 1.11 0 .803-.008 1.448-.008 1.65 0 .158.113.345.412.285A6.01 6.01 0 0 0 16 10.148c0-3.315-2.685-6-6-6" clipRule="evenodd"/>
        <defs>
          <linearGradient id="a" x1={20} x2={0} y1={0} y2={20} gradientUnits="userSpaceOnUse">
            <stop stopColor="#48EAEB"/>
            <stop offset={0.505} stopColor="#5B53FF"/>
            <stop offset={1} stopColor="#8952FD"/>
          </linearGradient>
        </defs>
      </svg>);
});
Github.displayName = "Github";
exports.default = Github;
