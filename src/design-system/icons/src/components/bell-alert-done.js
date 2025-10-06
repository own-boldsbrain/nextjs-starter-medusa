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
var BellAlertDone = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <g clipPath="url(#a)">
          <circle cx={12.5} cy={2.5} r={2.5} fill="#2563EB"/>
          <circle cx={12.5} cy={2.5} r={2.25} stroke={color} strokeOpacity={0.24} strokeWidth={0.5}/>
          <path fill={color} d="M8.993.575A4.973 4.973 0 0 0 2.528 5.32v4.223c0 .568-.46 1.028-1.028 1.028a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5c-.568 0-1.028-.46-1.028-1.028V6.5a4 4 0 0 1-1.5-.302v3.344c0 .366.078.714.218 1.028H3.81a2.5 2.5 0 0 0 .218-1.028V5.32A3.473 3.473 0 0 1 8.53 2.003c.063-.512.223-.994.462-1.428M8.912 13.04a.44.44 0 0 0-.345-.165H6.434a.444.444 0 0 0-.434.536c.153.73.771 1.242 1.5 1.242.73 0 1.348-.511 1.502-1.242a.45.45 0 0 0-.09-.372"/>
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h15v15H0z"/>
          </clipPath>
        </defs>
      </svg>);
});
BellAlertDone.displayName = "BellAlertDone";
exports.default = BellAlertDone;
