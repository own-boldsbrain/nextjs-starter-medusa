"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.generateTokens = generateTokens;
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var figma_1 = require("../../figma");
var constants_1 = require("../../constants");
var figma_client_1 = require("../../figma-client");
var logger_1 = require("../../logger");
var colors_1 = require("./utils/colors");
var effects_1 = require("./utils/effects");
function generateTokens(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var res, colorNodeIds, textNodeIds, effectNodeIds, _c, colorStyles, textStyles, effectStyles, themeNode, typo, typoPath, colorTokensPath, effectTokensPath, componentTokensPath, colorsExtension, boxShadowExtension, themeExtension, tailwindConfigPath;
        var _d;
        var output = _b.output;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    logger_1.logger.info("Fetching file styles");
                    return [4 /*yield*/, figma_client_1.client.getFileStyles(constants_1.FIGMA_FILE_ID).catch(function (err) {
                            logger_1.logger.error("Failed to fetch file styles: ".concat(err.message));
                            process.exit(1);
                        })];
                case 1:
                    res = _e.sent();
                    logger_1.logger.success("Fetched file styles successfully");
                    colorNodeIds = [];
                    textNodeIds = [];
                    effectNodeIds = [];
                    (_d = res.meta) === null || _d === void 0 ? void 0 : _d.styles.forEach(function (style) {
                        if (style.style_type === "FILL") {
                            colorNodeIds.push(style.node_id);
                        }
                        if (style.style_type === "TEXT") {
                            textNodeIds.push(style.node_id);
                        }
                        if (style.style_type === "EFFECT") {
                            effectNodeIds.push(style.node_id);
                        }
                    });
                    logger_1.logger.info("Fetching file nodes");
                    return [4 /*yield*/, Promise.all([
                            figma_client_1.client.getFileNodes(constants_1.FIGMA_FILE_ID, {
                                ids: colorNodeIds,
                            }),
                            figma_client_1.client.getFileNodes(constants_1.FIGMA_FILE_ID, {
                                ids: textNodeIds,
                            }),
                            figma_client_1.client.getFileNodes(constants_1.FIGMA_FILE_ID, {
                                ids: effectNodeIds,
                            }),
                        ])
                            .catch(function (err) {
                            logger_1.logger.error("Failed to fetch file nodes: ".concat(err.message));
                            process.exit(1);
                        })
                            .finally(function () {
                            logger_1.logger.success("Fetched file nodes successfully");
                        })];
                case 2:
                    _c = _e.sent(), colorStyles = _c[0], textStyles = _c[1], effectStyles = _c[2];
                    themeNode = {
                        colors: {
                            dark: {},
                            light: {},
                        },
                        effects: {
                            dark: {},
                            light: {},
                        },
                        components: {
                            dark: {},
                            light: {},
                        },
                    };
                    typo = Object.values(textStyles.nodes).reduce(function (acc, curr) {
                        if (!curr) {
                            return acc;
                        }
                        var node = curr.document;
                        var isText = node.name.startsWith("Text");
                        if (isText) {
                            var _a = node.name.split("/"), _parent = _a[0], identifier = _a[1];
                            var _b = node.style, lineHeightPx = _b.lineHeightPx, fontWeight = _b.fontWeight, fontSize = _b.fontSize;
                            var name_1 = "." + identifier.toLowerCase().replace("text", "txt");
                            var style = {
                                fontSize: "".concat(fontSize / 16, "rem"),
                                lineHeight: "".concat(lineHeightPx / 16, "rem"),
                                fontWeight: "".concat(fontWeight),
                                fontFamily: constants_1.FONT_FAMILY_SANS.join(", "),
                            };
                            acc[name_1] = style;
                            return acc;
                        }
                        var isHeader = node.name.startsWith("Headers");
                        if (isHeader) {
                            var _c = node.name.split("/"), theme = _c[0], identifier = _c[1];
                            var formattedTheme = theme.toLowerCase().replace("headers ", "");
                            var formattedIdentifier = identifier.toLowerCase();
                            var name_2 = "." + "".concat(formattedIdentifier, "-").concat(formattedTheme);
                            var _d = node.style, lineHeightPx = _d.lineHeightPx, fontSize = _d.fontSize, fontWeight = _d.fontWeight;
                            var style = {
                                fontSize: "".concat(fontSize / 16, "rem"),
                                lineHeight: "".concat(lineHeightPx / 16, "rem"),
                                fontWeight: "".concat(fontWeight),
                                fontFamily: constants_1.FONT_FAMILY_SANS.join(", "),
                            };
                            acc[name_2] = style;
                            return acc;
                        }
                        var isCodeBlock = node.name.startsWith("Code");
                        if (isCodeBlock) {
                            var _e = node.name.split("/"), _parent = _e[0], identifier = _e[1];
                            var formattedIdentifier = "." + "code-" + identifier.toLowerCase();
                            var _f = node.style, lineHeightPx = _f.lineHeightPx, fontSize = _f.fontSize, fontWeight = _f.fontWeight;
                            var style = {
                                fontSize: "".concat(fontSize / 16, "rem"),
                                lineHeight: "".concat(lineHeightPx / 16, "rem"),
                                fontWeight: "".concat(fontWeight),
                                fontFamily: constants_1.FONT_FAMILY_MONO.join(", "),
                            };
                            acc[formattedIdentifier] = style;
                            return acc;
                        }
                        return acc;
                    }, {});
                    typoPath = path_1.default.join(output, "tokens", "typography.ts");
                    logger_1.logger.info("Writing typography tokens to file");
                    return [4 /*yield*/, fs_extra_1.default
                            .outputFile(typoPath, "export const typography = ".concat(JSON.stringify(typo, null, 2)))
                            .then(function () {
                            logger_1.logger.success("Typography tokens written to file successfully");
                        })
                            .catch(function (err) {
                            logger_1.logger.error("Failed to write typography tokens to file: ".concat(err.message));
                            process.exit(1);
                        })];
                case 3:
                    _e.sent();
                    Object.values(colorStyles.nodes).reduce(function (acc, curr) {
                        if (!curr) {
                            return acc;
                        }
                        var _a = curr.document.name.split("/"), theme = _a[0], _ = _a[1], variable = _a[2];
                        var lowerCaseTheme = theme.toLowerCase();
                        if (lowerCaseTheme !== "light" && lowerCaseTheme !== "dark") {
                            return acc;
                        }
                        var fills = curr.document.fills;
                        var solid = fills.find(function (fill) { return fill.type === "SOLID"; });
                        var gradient = fills.find(function (fill) { return fill.type === "GRADIENT_LINEAR"; });
                        if (!solid && !gradient) {
                            return acc;
                        }
                        var solidVariable = "--".concat(variable);
                        var gradientIdentifier = "".concat(variable, "-gradient");
                        if (solid && solid.color) {
                            acc["colors"][lowerCaseTheme][solidVariable] = (0, colors_1.colorToRGBA)(solid.color, solid.opacity);
                        }
                        if (gradient) {
                            var values = (0, colors_1.gradientValues)(gradient);
                            if (values) {
                                if (values.type === figma_1.PaintType.GRADIENT_LINEAR) {
                                    var toVariable = "--".concat(gradientIdentifier, "-to");
                                    var fromVariable = "--".concat(gradientIdentifier, "-from");
                                    var component = (0, colors_1.createLinearGradientComponent)(__assign(__assign({}, values), { to: toVariable, from: fromVariable }));
                                    if (component) {
                                        acc["colors"][lowerCaseTheme][fromVariable] = values.from;
                                        acc["colors"][lowerCaseTheme][toVariable] = values.to;
                                        acc["components"][lowerCaseTheme][".".concat(gradientIdentifier)] =
                                            component;
                                    }
                                }
                                else {
                                    logger_1.logger.warn("Unsupported gradient type: ".concat(values.type));
                                }
                            }
                        }
                        return acc;
                    }, themeNode);
                    Object.values(effectStyles.nodes).reduce(function (acc, curr) {
                        if (!curr) {
                            return acc;
                        }
                        var _a = curr.document.name.split("/"), theme = _a[0], type = _a[1], variable = _a[2];
                        if (!type || !variable) {
                            return acc;
                        }
                        var lowerCaseTheme = theme.toLowerCase();
                        var lowerCaseType = type.toLowerCase();
                        if (lowerCaseTheme !== "light" && lowerCaseTheme !== "dark") {
                            return acc;
                        }
                        var effects = curr.document.effects;
                        if (!effects) {
                            return acc;
                        }
                        var identifier = "--".concat(lowerCaseType, "-").concat(variable);
                        /**
                         * Figma returns effects in reverse order
                         * so we need to reverse them back to get the correct order
                         */
                        var reversedEffects = effects.reverse();
                        var value = (0, effects_1.createDropShadowVariable)(reversedEffects, identifier);
                        if (!value) {
                            return acc;
                        }
                        acc["effects"][lowerCaseTheme][identifier] = value;
                        return acc;
                    }, themeNode);
                    logger_1.logger.info("Writing tokens to files");
                    logger_1.logger.info("Writing colors to file");
                    colorTokensPath = path_1.default.join(output, "tokens", "colors.ts");
                    return [4 /*yield*/, fs_extra_1.default
                            .outputFile(colorTokensPath, "export const colors = ".concat(JSON.stringify(themeNode.colors, null, 2)))
                            .then(function () {
                            logger_1.logger.success("Wrote colors to file successfully");
                        })
                            .catch(function (err) {
                            logger_1.logger.error("Failed to write colors to file: ".concat(err.message));
                            process.exit(1);
                        })];
                case 4:
                    _e.sent();
                    logger_1.logger.info("Writing effects to file");
                    effectTokensPath = path_1.default.join(output, "tokens", "effects.ts");
                    return [4 /*yield*/, fs_extra_1.default
                            .outputFile(effectTokensPath, "export const effects = ".concat(JSON.stringify(themeNode.effects, null, 2)))
                            .then(function () {
                            logger_1.logger.success("Wrote effects to file successfully");
                        })
                            .catch(function (err) {
                            logger_1.logger.error("Failed to write effects to file: ".concat(err.message));
                            process.exit(1);
                        })];
                case 5:
                    _e.sent();
                    logger_1.logger.info("Writing components to file");
                    componentTokensPath = path_1.default.join(output, "tokens", "components.ts");
                    return [4 /*yield*/, fs_extra_1.default
                            .outputFile(componentTokensPath, "export const components = ".concat(JSON.stringify(themeNode.components, null, 2)))
                            .then(function () {
                            logger_1.logger.success("Wrote components to file successfully");
                        })
                            .catch(function (err) {
                            logger_1.logger.error("Failed to write components to file: ".concat(err.message));
                            process.exit(1);
                        })];
                case 6:
                    _e.sent();
                    logger_1.logger.success("Wrote tokens to files successfully");
                    logger_1.logger.info("Extending Tailwind config");
                    colorsExtension = {};
                    Object.keys(themeNode.colors.light).reduce(function (acc, curr) {
                        var _a = curr.split(/(?<=\w)-(?=\w)/), prefix = _a[0], style = _a[1], state = _a[2], context = _a[3], others = _a.slice(4);
                        if (state === "gradient" ||
                            context === "gradient" ||
                            (others.length > 0 && others.includes("gradient"))) {
                            // We don't want to add gradients to the tailwind config, as they are added as components
                            return acc;
                        }
                        var fixedPrefix = prefix.replace("--", "");
                        if (!acc[fixedPrefix]) {
                            acc[fixedPrefix] = {};
                        }
                        if (!acc[fixedPrefix][style]) {
                            acc[fixedPrefix][style] = {};
                        }
                        if (!state) {
                            acc[fixedPrefix][style] = __assign(__assign({}, acc[fixedPrefix][style]), { DEFAULT: "var(".concat(curr, ")") });
                            return acc;
                        }
                        if (!acc[fixedPrefix][style][state]) {
                            acc[fixedPrefix][style][state] = {};
                        }
                        if (!context) {
                            acc[fixedPrefix][style][state] = __assign(__assign({}, acc[fixedPrefix][style][state]), { DEFAULT: "var(".concat(curr, ")") });
                            return acc;
                        }
                        if (context === "gradient") {
                            // We don't want to add gradients to the tailwind config, as they are added as components
                            return acc;
                        }
                        if (!acc[fixedPrefix][style][state][context]) {
                            acc[fixedPrefix][style][state][context] = {};
                        }
                        acc[fixedPrefix][style][state][context] = __assign(__assign({}, acc[fixedPrefix][style][state][context]), { DEFAULT: "var(".concat(curr, ")") });
                        return acc;
                    }, colorsExtension);
                    boxShadowExtension = {};
                    Object.keys(themeNode.effects.light).reduce(function (acc, curr) {
                        var key = "".concat(curr.replace("--", ""));
                        acc[key] = "var(".concat(curr, ")");
                        return acc;
                    }, boxShadowExtension);
                    themeExtension = {
                        extend: {
                            colors: {
                                ui: colorsExtension,
                            },
                            boxShadow: boxShadowExtension,
                        },
                    };
                    tailwindConfigPath = path_1.default.join(output, "extension", "theme.ts");
                    return [4 /*yield*/, fs_extra_1.default
                            .outputFile(tailwindConfigPath, "export const theme = ".concat(JSON.stringify(themeExtension, null, 2)))
                            .then(function () {
                            logger_1.logger.success("Wrote Tailwind config extension successfully");
                        })
                            .catch(function (err) {
                            logger_1.logger.error("Failed to write Tailwind config extension: ".concat(err.message));
                            process.exit(1);
                        })];
                case 7:
                    _e.sent();
                    logger_1.logger.success("Extended Tailwind config successfully");
                    return [2 /*return*/];
            }
        });
    });
}
