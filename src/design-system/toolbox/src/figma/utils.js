"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNodeType = isNodeType;
exports.encodeQuery = encodeQuery;
/**
 * Checks if a node is of a certain type.
 */
function isNodeType(node, type) {
    return node.type === type;
}
/**
 * Encodes an object into a query string.
 */
function encodeQuery(obj) {
    if (!obj) {
        return "";
    }
    return Object.entries(obj)
        .map(function (_a) {
        var k = _a[0], v = _a[1];
        return k && v && "".concat(k, "=").concat(encodeURIComponent(v));
    })
        .filter(Boolean)
        .join("&");
}
