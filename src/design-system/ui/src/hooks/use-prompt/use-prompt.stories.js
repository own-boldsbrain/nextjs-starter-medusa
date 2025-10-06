"use strict";
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
exports.WithVerificationText = exports.Default = void 0;
var React = require("react");
var button_1 = require("@/components/button");
var badge_1 = require("../../components/badge");
var text_1 = require("../../components/text");
var use_prompt_1 = require("./use-prompt");
var Demo = function (_a) {
    var verificationText = _a.verificationText;
    var _b = React.useState(false), status = _b[0], setStatus = _b[1];
    var dialog = (0, use_prompt_1.usePrompt)();
    var handleDangerousAction = function () { return __awaiter(void 0, void 0, void 0, function () {
        var confirmed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dialog({
                        title: "Delete Product",
                        description: "Are you sure you want to delete this product? This action cannot be undone.",
                        verificationText: verificationText,
                        variant: "danger",
                    })];
                case 1:
                    confirmed = _a.sent();
                    setStatus(confirmed);
                    return [2 /*return*/];
            }
        });
    }); };
    return (<div className="flex flex-col items-center gap-y-2">
      <button_1.Button variant="danger" onClick={handleDangerousAction}>
        Delete Product
      </button_1.Button>
      <text_1.Text>
        Status: <badge_1.Badge>{status ? "Confirmed" : "Unconfirmed"}</badge_1.Badge>
      </text_1.Text>
    </div>);
};
var meta = {
    title: "Hooks/usePrompt",
    component: Demo,
    parameters: {
        layout: "centered",
    },
};
exports.default = meta;
exports.Default = {};
exports.WithVerificationText = {
    args: {
        verificationText: "product",
    },
};
