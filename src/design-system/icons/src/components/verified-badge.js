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
var VerifiedBadge = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <path fill="#2563EB" fillRule="evenodd" d="M4.887 1.192A3.45 3.45 0 0 1 7.5 0a3.45 3.45 0 0 1 2.613 1.192 3.45 3.45 0 0 1 2.69 1.005 3.46 3.46 0 0 1 1.006 2.69 3.455 3.455 0 0 1 .88 4.05c-.206.45-.506.851-.88 1.176a3.46 3.46 0 0 1-1.006 2.69 3.45 3.45 0 0 1-2.69 1.005 3.455 3.455 0 0 1-4.05.88 3.45 3.45 0 0 1-1.176-.88 3.45 3.45 0 0 1-2.69-1.004 3.45 3.45 0 0 1-1.006-2.69A3.45 3.45 0 0 1 0 7.5a3.45 3.45 0 0 1 1.192-2.613 3.45 3.45 0 0 1 1.005-2.69 3.45 3.45 0 0 1 2.69-1.005" clipRule="evenodd"/>
        <path fill="url(#a)" fillOpacity={0.2} fillRule="evenodd" d="M4.887 1.192A3.45 3.45 0 0 1 7.5 0a3.45 3.45 0 0 1 2.613 1.192 3.45 3.45 0 0 1 2.69 1.005 3.46 3.46 0 0 1 1.006 2.69 3.455 3.455 0 0 1 .88 4.05c-.206.45-.506.851-.88 1.176a3.46 3.46 0 0 1-1.006 2.69 3.45 3.45 0 0 1-2.69 1.005 3.455 3.455 0 0 1-4.05.88 3.45 3.45 0 0 1-1.176-.88 3.45 3.45 0 0 1-2.69-1.004 3.45 3.45 0 0 1-1.006-2.69A3.45 3.45 0 0 1 0 7.5a3.45 3.45 0 0 1 1.192-2.613 3.45 3.45 0 0 1 1.005-2.69 3.45 3.45 0 0 1 2.69-1.005" clipRule="evenodd"/>
        <path stroke={color} strokeOpacity={0.24} strokeWidth={0.5} d="M7.5.25a3.2 3.2 0 0 1 2.424 1.105l.082.095.125-.01a3.2 3.2 0 0 1 2.496.933v.001a3.2 3.2 0 0 1 .933 2.495l-.01.125.095.082A3.2 3.2 0 0 1 14.75 7.5l-.005.172a3.2 3.2 0 0 1-1.1 2.252l-.095.082.01.125a3.2 3.2 0 0 1-.934 2.495 3.2 3.2 0 0 1-2.495.934l-.125-.01-.082.095A3.2 3.2 0 0 1 7.5 14.75l-.172-.005a3.2 3.2 0 0 1-2.252-1.1l-.082-.095-.125.01a3.2 3.2 0 0 1-2.37-.814l-.126-.119a3.2 3.2 0 0 1-.933-2.496l.01-.125-.096-.082a3.206 3.206 0 0 1 .001-4.848l.095-.082-.01-.125a3.2 3.2 0 0 1 .933-2.495l.001-.001a3.2 3.2 0 0 1 2.495-.933l.125.01.082-.095a3.2 3.2 0 0 1 2.252-1.1z"/>
        <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m4.584 7.792 2.333 2.333 3.5-5.25"/>
        <defs>
          <linearGradient id="a" x1={7.5} x2={7.5} y1={0} y2={15} gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff"/>
            <stop offset={1} stopColor="#fff" stopOpacity={0}/>
          </linearGradient>
        </defs>
      </svg>);
});
VerifiedBadge.displayName = "VerifiedBadge";
exports.default = VerifiedBadge;
