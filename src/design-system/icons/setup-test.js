"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@testing-library/jest-dom");
var jsdom_1 = require("jsdom");
var resize_observer_polyfill_1 = require("resize-observer-polyfill");
var window = new jsdom_1.JSDOM().window;
window.ResizeObserver = resize_observer_polyfill_1.default;
global.ResizeObserver = resize_observer_polyfill_1.default;
window.Element.prototype.scrollTo = function () {
    // no-op
};
window.requestAnimationFrame = function (cb) { return setTimeout(cb, 1000 / 60); };
Object.assign(global, { window: window, document: window.document });
