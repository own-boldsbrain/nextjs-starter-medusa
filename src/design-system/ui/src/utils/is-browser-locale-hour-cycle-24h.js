"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBrowserLocaleClockType24h = void 0;
var isBrowserLocaleClockType24h = function () {
    var language = typeof window !== "undefined" ? window.navigator.language : "en-US";
    var hr = new Intl.DateTimeFormat(language, {
        hour: "numeric",
    }).format();
    return Number.isInteger(Number(hr));
};
exports.isBrowserLocaleClockType24h = isBrowserLocaleClockType24h;
