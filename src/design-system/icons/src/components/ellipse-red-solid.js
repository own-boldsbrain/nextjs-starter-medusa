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
var EllipseRedSolid = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <g clipPath="url(#a)" filter="url(#b)">
          <rect width={10} height={10} x={2.5} y={2.5} fill="#fff" rx={5}/>
          <circle cx={7.5} cy={7.5} r={3} fill="#F43F5E"/>
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h15v15H0z"/>
          </clipPath>
          <filter id="b" width={14} height={14} x={0.5} y={1.5} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
            <feFlood floodOpacity={0} result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feMorphology in="SourceAlpha" operator="dilate" radius={1} result="effect1_dropShadow_2733_2047"/>
            <feOffset />
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/>
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_2733_2047"/>
            <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset dy={1}/>
            <feGaussianBlur stdDeviation={1}/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
            <feBlend in2="effect1_dropShadow_2733_2047" result="effect2_dropShadow_2733_2047"/>
            <feBlend in="SourceGraphic" in2="effect2_dropShadow_2733_2047" result="shape"/>
          </filter>
        </defs>
      </svg>);
});
EllipseRedSolid.displayName = "EllipseRedSolid";
exports.default = EllipseRedSolid;
