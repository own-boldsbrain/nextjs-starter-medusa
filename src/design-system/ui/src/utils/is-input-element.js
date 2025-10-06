"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInputElement = void 0;
var isInputElement = function (element) {
    return (element instanceof HTMLElement &&
        (element.isContentEditable ||
            element.tagName === "INPUT" ||
            element.tagName === "TEXTAREA" ||
            element.tagName === "SELECT"));
};
exports.isInputElement = isInputElement;
