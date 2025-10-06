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
var PhotoSolid = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <g fill={color} clipPath="url(#a)">
          <path d="M11.228 6.952a2.45 2.45 0 0 0-3.457 0l-5.545 5.546c.19.07.393.113.607.113h9.334c.982 0 1.777-.796 1.777-1.778V9.668z"/>
          <path d="M12.167 13.278H2.833A2.446 2.446 0 0 1 .39 10.833V4.167a2.446 2.446 0 0 1 2.444-2.445h9.334a2.446 2.446 0 0 1 2.444 2.445v6.666a2.446 2.446 0 0 1-2.444 2.445M2.833 3.056c-.612 0-1.11.498-1.11 1.11v6.667c0 .613.498 1.111 1.11 1.111h9.334c.612 0 1.11-.498 1.11-1.11V4.166c0-.613-.498-1.111-1.11-1.111z"/>
          <path d="M4.611 7.056a1.111 1.111 0 1 0 0-2.223 1.111 1.111 0 0 0 0 2.223"/>
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h15v15H0z"/>
          </clipPath>
        </defs>
      </svg>);
});
PhotoSolid.displayName = "PhotoSolid";
exports.default = PhotoSolid;
