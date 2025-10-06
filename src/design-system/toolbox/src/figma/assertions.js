"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEffectShadow = isEffectShadow;
exports.isEffectBlur = isEffectBlur;
exports.isPaintSolid = isPaintSolid;
exports.isPaintGradient = isPaintGradient;
exports.isPaintImage = isPaintImage;
var types_1 = require("./types");
function isEffectShadow(effect) {
    return (effect.type === types_1.EffectType.DROP_SHADOW ||
        effect.type === types_1.EffectType.INNER_SHADOW);
}
function isEffectBlur(effect) {
    return (effect.type === types_1.EffectType.BACKGROUND_BLUR ||
        effect.type === types_1.EffectType.LAYER_BLUR);
}
function isPaintSolid(paint) {
    return paint.type === types_1.PaintType.SOLID;
}
function isPaintGradient(paint) {
    return (paint.type === types_1.PaintType.GRADIENT_ANGULAR ||
        paint.type === types_1.PaintType.GRADIENT_DIAMOND ||
        paint.type === types_1.PaintType.GRADIENT_LINEAR ||
        paint.type === types_1.PaintType.GRADIENT_RADIAL);
}
function isPaintImage(paint) {
    return paint.type === types_1.PaintType.IMAGE;
}
