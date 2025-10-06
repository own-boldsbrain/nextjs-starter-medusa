"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIcons = generateIcons;
var figma_client_1 = require("@/figma-client");
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var ts_dedent_1 = require("ts-dedent");
var utils_1 = require("@/commands/icons/utils");
var transformers_1 = require("@/transformers");
var constants_1 = require("@/constants");
var logger_1 = require("@/logger");
// We don't want to generate icons for these frames as they are not optimized
var BANNED_FRAMES = ["Flags"];
function generateIcons(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var skippedIcons, fileComponents, iconNodes, URLData, length, i, slice, requests;
        var _this = this;
        var _c;
        var output = _b.output;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    skippedIcons = [];
                    // Ensure the destination directory exists
                    return [4 /*yield*/, fs_extra_1.default.mkdirp(output)];
                case 1:
                    // Ensure the destination directory exists
                    _d.sent();
                    logger_1.logger.info("Fetching components from Figma");
                    return [4 /*yield*/, figma_client_1.client
                            .getFileComponents(constants_1.FIGMA_FILE_ID)
                            .then(function (file) {
                            logger_1.logger.success("Successfully fetched components from Figma");
                            return file;
                        })
                            .catch(function (_error) {
                            logger_1.logger.error("Failed to fetch components from Figma");
                            return null;
                        })];
                case 2:
                    fileComponents = _d.sent();
                    if (!fileComponents) {
                        return [2 /*return*/];
                    }
                    logger_1.logger.info("Fetching URLs for SVGs");
                    iconNodes = (_c = fileComponents.meta) === null || _c === void 0 ? void 0 : _c.components.reduce(function (acc, component) {
                        var frameInfo = component.containing_frame;
                        if (!frameInfo) {
                            return acc;
                        }
                        if (BANNED_FRAMES.includes(frameInfo.name)) {
                            return acc;
                        }
                        if (frameInfo.pageId !== constants_1.FIGMA_ICONS_NODE_ID) {
                            return acc;
                        }
                        acc.push({
                            node_id: component.node_id,
                            name: component.name,
                            frame_name: frameInfo.name,
                        });
                        return acc;
                    }, []);
                    if (!iconNodes) {
                        logger_1.logger.error("Found no SVGs to export. Make sure that the Figma file is correct.");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, figma_client_1.client.getImage(constants_1.FIGMA_FILE_ID, {
                            ids: iconNodes.map(function (icon) { return icon.node_id; }),
                            format: "svg",
                            scale: 1,
                        })];
                case 3:
                    URLData = _d.sent();
                    logger_1.logger.success("Successfully fetched URLs for SVGs");
                    length = iconNodes.length;
                    logger_1.logger.info("Transforming SVGs");
                    i = 0;
                    _d.label = 4;
                case 4:
                    if (!(i < length)) return [3 /*break*/, 7];
                    slice = iconNodes.slice(i, i + 20);
                    requests = slice.map(function (icon) { return __awaiter(_this, void 0, void 0, function () {
                        var URL, code, e_1, _a, componentName, fileName, testName, fixed, component, filePath, ext, fileNameWithoutExt, testFilePath, testFile;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    URL = URLData.images[icon.node_id];
                                    if (!URL) {
                                        logger_1.logger.warn("Failed to fetch icon ".concat(icon.name, ". Skipping..."));
                                        skippedIcons.push(icon.name);
                                        return [2 /*return*/];
                                    }
                                    code = null;
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, figma_client_1.client.getResource(URL)];
                                case 2:
                                    code = _b.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_1 = _b.sent();
                                    logger_1.logger.warn("Failed to fetch icon ".concat(icon.name, ". Skipping..."));
                                    skippedIcons.push(icon.name);
                                    return [3 /*break*/, 4];
                                case 4:
                                    if (!code) {
                                        return [2 /*return*/];
                                    }
                                    _a = (0, utils_1.getIconData)(icon.name, icon.frame_name), componentName = _a.componentName, fileName = _a.fileName, testName = _a.testName, fixed = _a.fixed;
                                    return [4 /*yield*/, (0, transformers_1.transformSvg)({
                                            code: code,
                                            componentName: componentName,
                                            fixed: fixed,
                                        })];
                                case 5:
                                    component = _b.sent();
                                    filePath = (0, path_1.resolve)(output, fileName);
                                    return [4 /*yield*/, fs_extra_1.default.outputFile(filePath, component)
                                        // Get fileName without extension
                                    ];
                                case 6:
                                    _b.sent();
                                    ext = (0, path_1.extname)(fileName);
                                    fileNameWithoutExt = fileName.replace(ext, "");
                                    testFilePath = (0, path_1.resolve)((0, path_1.join)(output, "__tests__"), testName);
                                    testFile = (0, ts_dedent_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        import * as React from \"react\"\n        import { cleanup, render, screen } from \"@testing-library/react\"\n\n        import ", " from \"../", "\"\n\n        describe(\"", "\", () => {\n          it(\"should render the icon without errors\", async () => {\n            render(<", " data-testid=\"icon\" />)\n\n      \n            const svgElement = screen.getByTestId(\"icon\")\n\n            expect(svgElement).toBeInTheDocument()\n\n            cleanup()\n          })\n        })\n      "], ["\n        import * as React from \"react\"\n        import { cleanup, render, screen } from \"@testing-library/react\"\n\n        import ", " from \"../", "\"\n\n        describe(\"", "\", () => {\n          it(\"should render the icon without errors\", async () => {\n            render(<", " data-testid=\"icon\" />)\n\n      \n            const svgElement = screen.getByTestId(\"icon\")\n\n            expect(svgElement).toBeInTheDocument()\n\n            cleanup()\n          })\n        })\n      "])), componentName, fileNameWithoutExt, componentName, componentName);
                                    return [4 /*yield*/, fs_extra_1.default.outputFile(testFilePath, testFile)];
                                case 7:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(requests)];
                case 5:
                    _d.sent();
                    _d.label = 6;
                case 6:
                    i += 20;
                    return [3 /*break*/, 4];
                case 7:
                    logger_1.logger.success("Successfully transformed SVGs");
                    if (skippedIcons.length) {
                        logger_1.logger.warn("Skipped ".concat(skippedIcons.length, " icons. Check the logs for more information."));
                    }
                    logger_1.logger.info("Generating index file");
                    return [4 /*yield*/, (0, utils_1.generateIndex)(output)];
                case 8:
                    _d.sent();
                    logger_1.logger.success("Successfully generated index file");
                    logger_1.logger.success("Successfully generated ".concat(length, " icons \u2728"));
                    return [2 /*return*/];
            }
        });
    });
}
var templateObject_1;
