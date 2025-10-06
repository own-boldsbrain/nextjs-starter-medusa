"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var picocolors_1 = require("picocolors");
var PREFIX = picocolors_1.default.magenta("[toolbox]");
exports.logger = {
    info: function (message) {
        console.log("".concat(PREFIX, " ").concat(picocolors_1.default.gray(message)));
    },
    success: function (message) {
        console.log("".concat(PREFIX, " ").concat(picocolors_1.default.green(message)));
    },
    warn: function (message) {
        console.log("".concat(PREFIX, " ").concat(picocolors_1.default.yellow(message)));
    },
    error: function (message) {
        console.log("".concat(PREFIX, " ").concat(picocolors_1.default.red(message)));
    },
};
