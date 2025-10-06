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
var ServerStack = React.forwardRef(function (_a, ref) {
    var _b = _a.color, color = _b === void 0 ? "currentColor" : _b, props = __rest(_a, ["color"]);
    return (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" ref={ref} {...props}>
        <g clipPath="url(#a)">
          <path fill={color} fillRule="evenodd" d="M2.389 2.08c-.269 0-.583.253-.583.69v1.92c0 .436.314.69.583.69h10.222c.27 0 .584-.254.584-.69V2.77c0-.437-.315-.69-.584-.69zm-2.083.69c0-1.155.88-2.19 2.083-2.19h10.222c1.204 0 2.084 1.035 2.084 2.19v1.92c0 1.154-.88 2.19-2.084 2.19H2.39C1.185 6.88.306 5.843.306 4.69zm4.069.96a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0m2.5 0a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0m-3.3 8.34a.8.8 0 1 0 0-1.6.8.8 0 0 0 0 1.6m3.3-.8a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0m-5.07-.96c0-.436.315-.69.584-.69h10.222c.27 0 .584.254.584.69v1.92c0 .437-.315.69-.584.69H2.39c-.269 0-.583-.253-.583-.69zm.584-2.19C1.185 8.12.306 9.158.306 10.31v1.92c0 1.155.88 2.19 2.083 2.19h10.222c1.204 0 2.084-1.035 2.084-2.19v-1.92c0-1.154-.88-2.19-2.084-2.19z" clipRule="evenodd"/>
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h15v15H0z"/>
          </clipPath>
        </defs>
      </svg>);
});
ServerStack.displayName = "ServerStack";
exports.default = ServerStack;
