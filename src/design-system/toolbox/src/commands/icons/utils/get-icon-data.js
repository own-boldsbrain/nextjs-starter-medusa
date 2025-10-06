"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponentName = getComponentName;
exports.getIconData = getIconData;
function getComponentName(name) {
    return name
        .replace(/[-_]+/g, " ")
        .replace(/[^\w\s]/g, "")
        .replace(/\s+(.)(\w*)/g, function (_$1, $2, $3) { return "".concat($2.toUpperCase() + $3.toLowerCase()); })
        .replace(/\w/, function (s) { return s.toUpperCase(); });
}
function getFileName(name) {
    return "".concat(name.replace("$", "").replace("/", "-"), ".tsx");
}
function getTestName(name) {
    return "".concat(name.replace("$", "").replace("/", "-"), ".spec.tsx");
}
var FIXED_FRAMES = ["Flags", "Brands"];
function isFixedIcon(name, frame_name) {
    if (FIXED_FRAMES.includes(frame_name)) {
        if (frame_name === "Brands" && name.includes("-ex")) {
            return false;
        }
        return true;
    }
    return false;
}
function getIconData(name, frame_name) {
    var componentName = getComponentName(name);
    var fileName = getFileName(name);
    var testName = getTestName(name);
    var fixed = isFixedIcon(name, frame_name);
    return {
        componentName: componentName,
        testName: testName,
        fileName: fileName,
        fixed: fixed,
    };
}
