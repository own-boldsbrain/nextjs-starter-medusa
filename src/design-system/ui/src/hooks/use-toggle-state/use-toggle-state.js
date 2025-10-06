"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useToggleState = void 0;
var React = require("react");
var useToggleState = function (initial) {
    if (initial === void 0) { initial = false; }
    var _a = React.useState(initial), state = _a[0], setState = _a[1];
    var close = function () {
        setState(false);
    };
    var open = function () {
        setState(true);
    };
    var toggle = function () {
        setState(function (state) { return !state; });
    };
    var hookData = [state, open, close, toggle];
    hookData.state = state;
    hookData.open = open;
    hookData.close = close;
    hookData.toggle = toggle;
    return hookData;
};
exports.useToggleState = useToggleState;
