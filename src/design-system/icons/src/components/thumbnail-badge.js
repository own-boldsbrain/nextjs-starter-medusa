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
var ThumbnailBadge = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <circle cx={7.5} cy={7.5} r={7.5} fill="#2563EB"/>
        <circle cx={7.5} cy={7.5} r={7.5} fill="url(#a)" fillOpacity={0.2}/>
        <circle cx={7.5} cy={7.5} r={7.25} stroke={color} strokeOpacity={0.24} strokeWidth={0.5}/>
        <g fill="#fff" clipPath="url(#b)">
          <path d="M3.75 9.892a.696.696 0 0 1-.694-.694V5.802a.696.696 0 0 1 .914-.659l.467.156a.417.417 0 0 1-.264.79l-.285-.094v3.01l.285-.095a.416.416 0 1 1 .264.791l-.467.156a.7.7 0 0 1-.22.036M5.972 10.972a.695.695 0 0 1-.694-.694V4.722a.693.693 0 0 1 .961-.64l.45.186a.417.417 0 0 1-.321.77l-.256-.107v5.139l.256-.107a.417.417 0 0 1 .32.77l-.449.186a.7.7 0 0 1-.267.053M11.38 4.473 8.485 3.137a.694.694 0 0 0-.986.63v7.466a.69.69 0 0 0 .694.695.7.7 0 0 0 .292-.065l2.893-1.335a.98.98 0 0 0 .565-.883v-4.29a.98.98 0 0 0-.565-.882"/>
        </g>
        <defs>
          <linearGradient id="a" x1={7.5} x2={7.5} y1={0} y2={15} gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff"/>
            <stop offset={1} stopColor="#fff" stopOpacity={0}/>
          </linearGradient>
          <clipPath id="b">
            <path fill="#fff" d="M2.5 2.5h10v10h-10z"/>
          </clipPath>
        </defs>
      </svg>);
});
ThumbnailBadge.displayName = "ThumbnailBadge";
exports.default = ThumbnailBadge;
