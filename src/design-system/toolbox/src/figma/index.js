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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
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
var axios_1 = require("axios");
var client_1 = require("./client");
var utils_1 = require("./utils");
var FIGMA_BASE_URL = "https://api.figma.com/v1/";
var Figma = /** @class */ (function () {
    function Figma(_a) {
        var accessToken = _a.accessToken, _b = _a.maxRetries, maxRetries = _b === void 0 ? 3 : _b;
        this._api = new client_1.default({
            accessToken: accessToken,
            baseURL: FIGMA_BASE_URL,
            maxRetries: maxRetries,
        });
    }
    /**
     * Get a resource by its URL.
     */
    Figma.prototype.getResource = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get(url)];
                    case 1:
                        response = _a.sent();
                        if (Math.floor(response.status / 100) !== 2) {
                            throw response.statusText;
                        }
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    Figma.prototype.getFile = function (file_key, options) {
        return __awaiter(this, void 0, void 0, function () {
            var queryString;
            return __generator(this, function (_a) {
                queryString = options
                    ? "?".concat((0, utils_1.encodeQuery)(__assign(__assign({}, options), { ids: options.ids && options.ids.join(",") })))
                    : "";
                return [2 /*return*/, this._api.request("GET", "files/".concat(file_key).concat(queryString))];
            });
        });
    };
    Figma.prototype.getFileNodes = function (file_key, options) {
        return __awaiter(this, void 0, void 0, function () {
            var queryString;
            return __generator(this, function (_a) {
                queryString = "?".concat((0, utils_1.encodeQuery)(__assign(__assign({}, options), { ids: options.ids.join(",") })));
                return [2 /*return*/, this._api.request("GET", "files/".concat(file_key, "/nodes").concat(queryString))];
            });
        });
    };
    Figma.prototype.getImage = function (file_key, options) {
        return __awaiter(this, void 0, void 0, function () {
            var queryString;
            return __generator(this, function (_a) {
                queryString = options
                    ? "?".concat((0, utils_1.encodeQuery)(__assign(__assign({}, options), { ids: options.ids && options.ids.join(",") })))
                    : "";
                return [2 /*return*/, this._api.request("GET", "images/".concat(file_key).concat(queryString))];
            });
        });
    };
    Figma.prototype.getImageFills = function (file_key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._api.request("GET", "files/".concat(file_key, "/images"))];
            });
        });
    };
    Figma.prototype.getComments = function (file_key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._api.request("GET", "files/".concat(file_key, "/comments"))];
            });
        });
    };
    Figma.prototype.postComment = function (file_key, 
    /** The text contents of the comment to post */
    message, 
    /** The position of where to place the comment. This can either be an absolute canvas position or the relative position within a frame. */
    client_meta, 
    /** (Optional) The comment to reply to, if any. This must be a root comment, that is, you cannot reply to a comment that is a reply itself (a reply has a parent_id). */
    comment_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._api.request("POST", "files/".concat(file_key, "/comments"), {
                        message: message,
                        client_meta: client_meta,
                        comment_id: comment_id,
                    })];
            });
        });
    };
    Figma.prototype.deleteComment = function (file_key, comment_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._api.request("DELETE", "files/".concat(file_key, "/comments/").concat(comment_id))];
            });
        });
    };
    Figma.prototype.getVersions = function (file_key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._api.request("GET", "files/".concat(file_key, "/versions"))];
            });
        });
    };
    Figma.prototype.getTeamProjects = function (teamId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._api.request("GET", "teams/".concat(teamId, "/projects"))];
            });
        });
    };
    Figma.prototype.getProjectFiles = function (project_id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var queryString;
            return __generator(this, function (_a) {
                queryString = options
                    ? "?".concat((0, utils_1.encodeQuery)(__assign({}, options)))
                    : "";
                return [2 /*return*/, this._api.request("GET", "projects/".concat(project_id, "/files").concat(queryString))];
            });
        });
    };
    /**
     * Get a paginated list of published components within a team library
     */
    Figma.prototype.getTeamComponents = function (team_id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var queryString;
            return __generator(this, function (_a) {
                queryString = options ? "?".concat((0, utils_1.encodeQuery)(options)) : "";
                return [2 /*return*/, this._api.request("GET", "teams/".concat(team_id, "/components").concat(queryString))];
            });
        });
    };
    /**
     * Get a list of published components within a file library
     */
    Figma.prototype.getFileComponents = function (file_key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._api.request("GET", "files/".concat(file_key, "/components"))];
            });
        });
    };
    /**
     * Get metadata on a component by key.
     */
    Figma.prototype.getComponent = function (component_key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._api.request("GET", "components/".concat(component_key))];
            });
        });
    };
    /**
     * Get a paginated list of published component_sets within a team library
     */
    Figma.prototype.getTeamComponentSets = function (team_id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var queryString;
            return __generator(this, function (_a) {
                queryString = options ? "?".concat((0, utils_1.encodeQuery)(options)) : "";
                return [2 /*return*/, this._api.request("GET", "teams/".concat(team_id, "/component_sets").concat(queryString))];
            });
        });
    };
    Figma.prototype.getFileComponentSets = function (file_key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._api.request("GET", "files/".concat(file_key, "/component_sets"))];
            });
        });
    };
    /**
     * Get metadata on a component_set by key.
     */
    Figma.prototype.getComponentSet = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._api.request("GET", "component_sets/".concat(key))];
            });
        });
    };
    /**
     * Get a paginated list of published styles within a team library
     */
    Figma.prototype.getTeamStyles = function (team_id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var queryString;
            return __generator(this, function (_a) {
                queryString = options ? "?".concat((0, utils_1.encodeQuery)(options)) : "";
                return [2 /*return*/, this._api.request("GET", "teams/".concat(team_id, "/styles").concat(queryString))];
            });
        });
    };
    /**
     * Get a list of published styles within a file library
     */
    Figma.prototype.getFileStyles = function (file_key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._api.request("GET", "files/".concat(file_key, "/styles"))];
            });
        });
    };
    /**
     * Get metadata on a style by key.
     */
    Figma.prototype.getStyle = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._api.request("GET", "styles/".concat(key))];
            });
        });
    };
    return Figma;
}());
__exportStar(require("./assertions"), exports);
__exportStar(require("./types"), exports);
exports.default = Figma;
