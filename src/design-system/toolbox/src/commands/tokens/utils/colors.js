"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorToRGBA = colorToRGBA;
exports.createLinearGradientComponent = createLinearGradientComponent;
exports.gradientValues = gradientValues;
var figma_1 = require("@/figma");
var logger_1 = require("@/logger");
/**
 * Normalizes a color's opacity to a 0-1 range.
 * @param opacity The opacity to normalize.
 * @returns The normalized opacity.
 */
function normalizeOpacity(opacity) {
    opacity = opacity !== undefined ? opacity : 1;
    return Math.round(opacity * 100) / 100;
}
/**
 * Normalizes a channel value to a 0-255 range.
 * @param value The channel value to normalize.
 * @returns The normalized channel value.
 */
function normalizeChannelValue(value) {
    return Math.round(value * 255);
}
/**
 * Converts a Color to an RGBA string.
 * @param color The color to convert to RGBA.
 * @param opacity The opacity to apply to the color.
 * @returns The RGBA string.
 */
function colorToRGBA(color, opacity) {
    var red = normalizeChannelValue(color.r);
    var green = normalizeChannelValue(color.g);
    var blue = normalizeChannelValue(color.b);
    /**
     * How Figma returns opacity for colors is a bit weird.
     * They always return the alpha channel as 1, even if the color is less than solid.
     * Instead, they return the opacity in a seperate opacity property.
     * So we need to check if the opacity is defined, and if it is,
     * use that for the alpha channel instead.
     */
    var alpha = opacity !== undefined
        ? normalizeOpacity(opacity)
        : Math.round(color.a * 100) / 100;
    return "rgba(".concat(red, ", ").concat(green, ", ").concat(blue, ", ").concat(alpha, ")");
}
/**
 * Calculates the gradient degree of a gradient.
 * @param handlebarPositions The handlebar positions of the gradient.
 * @returns The gradient degree.
 */
function calculateGradientDegree(handlebarPositions) {
    var startPoint = handlebarPositions[0];
    var endPoint = handlebarPositions[1];
    var angleRadians = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);
    var angleDegrees = (angleRadians * 180) / Math.PI;
    var normalizedAngleDegrees = (angleDegrees + 360) % 360;
    // Rotate the angle by 90 degrees to get the correct angle for CSS gradients
    var rotatedAngleDegrees = normalizedAngleDegrees + 90;
    return rotatedAngleDegrees;
}
/**
 * Get the values of a linear gradient.
 * @param gradient
 * @returns
 */
function linearGradientValues(gradient) {
    var opacity = normalizeOpacity(gradient.opacity) * 100;
    var degree = calculateGradientDegree(gradient.gradientHandlePositions);
    var from = colorToRGBA(gradient.gradientStops[0].color);
    var to = colorToRGBA(gradient.gradientStops[1].color);
    return {
        type: gradient.type,
        opacity: opacity,
        degree: degree,
        from: from,
        to: to,
    };
}
/**
 * Create a CSSProperties object for a linear gradient.
 * @param props
 * @returns
 */
function createLinearGradientComponent(_a) {
    var degree = _a.degree, from = _a.from, to = _a.to, opacity = _a.opacity;
    return {
        backgroundImage: "linear-gradient(".concat(degree, "deg, var(").concat(from, "), var(").concat(to, "))"),
        opacity: "".concat(opacity, "%"),
    };
}
/**
 * Get the values of a gradient based on its type.
 * @param gradient
 * @returns
 */
function gradientValues(gradient) {
    if (gradient.type === figma_1.PaintType.GRADIENT_LINEAR) {
        return linearGradientValues(gradient);
    }
    logger_1.logger.warn("The gradient type \"".concat(gradient.type, "\" is not supported."));
    return null;
}
