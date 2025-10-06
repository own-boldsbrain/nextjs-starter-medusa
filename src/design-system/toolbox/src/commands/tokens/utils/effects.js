"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDropShadowVariable = createDropShadowVariable;
var colors_1 = require("./colors");
/**
 * We know that we will need to correct the Y value of the inset shadows
 * on these effects due to the difference in the way Figma and CSS
 * handle shadows.
 */
var SPECIAL_IDENTIFIERS = [
    "--buttons-colored",
    "--buttons-neutral",
    "--buttons-neutral-focus",
    "--buttons-colored-focus",
];
function createDropShadowVariable(effects, identifier) {
    var shadows = effects.filter(function (effect) { return effect.type === "DROP_SHADOW" || effect.type === "INNER_SHADOW"; });
    if (shadows.length === 0) {
        return null;
    }
    var value = shadows
        .map(function (shadow) {
        var _a, _b;
        var color = shadow.color, offset = shadow.offset, radius = shadow.radius, spread = shadow.spread, type = shadow.type;
        var x = (_a = offset === null || offset === void 0 ? void 0 : offset.x) !== null && _a !== void 0 ? _a : 0;
        var y = (_b = offset === null || offset === void 0 ? void 0 : offset.y) !== null && _b !== void 0 ? _b : 0;
        if (SPECIAL_IDENTIFIERS.includes(identifier) &&
            type === "INNER_SHADOW" &&
            y > 0) {
            y = y - 1;
        }
        var b = radius;
        var s = spread !== null && spread !== void 0 ? spread : 0;
        var c = color ? (0, colors_1.colorToRGBA)(color) : "";
        var t = type === "INNER_SHADOW" ? "inset" : "";
        return "".concat(x, "px ").concat(y, "px ").concat(b, "px ").concat(s, "px ").concat(c, " ").concat(t).trim();
    })
        .join(", ");
    if (value.length === 0) {
        return null;
    }
    return value;
}
