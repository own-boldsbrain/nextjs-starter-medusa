"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clx = clx;
var clsx_1 = require("clsx");
var tailwind_merge_1 = require("tailwind-merge");
function clx() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return (0, tailwind_merge_1.twMerge)(clsx_1.default.apply(void 0, args));
}
