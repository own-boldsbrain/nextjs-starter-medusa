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
var Loader = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <g stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} clipPath="url(#a)">
          <path d="m2.943 2.943 1.571 1.571"/>
          <path d="M1.055 7.5h2.223" opacity={0.88}/>
          <path d="m2.943 12.057 1.571-1.572" opacity={0.75}/>
          <path d="M7.5 13.945v-2.222" opacity={0.63}/>
          <path d="m12.057 12.057-1.572-1.571" opacity={0.5}/>
          <path d="M13.945 7.5h-2.222" opacity={0.38}/>
          <path d="m12.057 2.943-1.572 1.571" opacity={0.25}/>
          <path d="M7.5 1.055v2.222" opacity={0.13}/>
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h15v15H0z"/>
          </clipPath>
        </defs>
      </svg>);
});
Loader.displayName = "Loader";
exports.default = Loader;
