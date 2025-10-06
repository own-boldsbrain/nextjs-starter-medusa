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
var react_1 = require("@testing-library/react");
var React = require("react");
var use_prompt_1 = require("./use-prompt");
var OPEN_TEXT = "Open dialog";
var TITLE_TEXT = "Delete something";
var DESCRIPTION_TEXT = "Are you sure? This cannot be undone.";
var CANCEL_TEXT = "Cancel";
var CONFIRM_TEXT = "Confirm";
var VERIFICATION_TEXT = "medusa-design-system";
var DialogTest = function (_a) {
    var verificationText = _a.verificationText;
    var dialog = (0, use_prompt_1.usePrompt)();
    var handleAction = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dialog({
                        title: TITLE_TEXT,
                        description: DESCRIPTION_TEXT,
                        cancelText: CANCEL_TEXT,
                        confirmText: CONFIRM_TEXT,
                        verificationText: verificationText,
                        variant: "danger",
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (<div>
      <button onClick={handleAction}>{OPEN_TEXT}</button>
    </div>);
};
describe("usePrompt", function () {
    var rendered;
    var trigger;
    beforeEach(function () {
        rendered = (0, react_1.render)(<DialogTest />);
        trigger = rendered.getByText(OPEN_TEXT);
    });
    afterEach(function () {
        // Try to find the cancel button and click it to close the dialog
        // We need to do this a we are appending a div to the body and it will not be removed
        // automatically by the cleanup
        var cancelButton = rendered.queryByText(CANCEL_TEXT);
        if (cancelButton) {
            react_1.fireEvent.click(cancelButton);
        }
    });
    it("renders a basic alert dialog when the trigger is clicked", function () { return __awaiter(void 0, void 0, void 0, function () {
        var title, description;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    react_1.fireEvent.click(trigger);
                    return [4 /*yield*/, rendered.findByText(TITLE_TEXT)];
                case 1:
                    title = _a.sent();
                    return [4 /*yield*/, rendered.findByText(DESCRIPTION_TEXT)];
                case 2:
                    description = _a.sent();
                    expect(title).toBeInTheDocument();
                    expect(description).toBeInTheDocument();
                    return [2 /*return*/];
            }
        });
    }); });
    it("unmounts the dialog when the cancel button is clicked", function () { return __awaiter(void 0, void 0, void 0, function () {
        var cancelButton, title, description;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    react_1.fireEvent.click(trigger);
                    return [4 /*yield*/, rendered.findByText(CANCEL_TEXT)];
                case 1:
                    cancelButton = _a.sent();
                    react_1.fireEvent.click(cancelButton);
                    title = rendered.queryByText(TITLE_TEXT);
                    description = rendered.queryByText(DESCRIPTION_TEXT);
                    expect(title).not.toBeInTheDocument();
                    expect(description).not.toBeInTheDocument();
                    return [2 /*return*/];
            }
        });
    }); });
    it("unmounts the dialog when the confirm button is clicked", function () { return __awaiter(void 0, void 0, void 0, function () {
        var confirmButton, title, description;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    react_1.fireEvent.click(trigger);
                    return [4 /*yield*/, rendered.findByText(CONFIRM_TEXT)];
                case 1:
                    confirmButton = _a.sent();
                    react_1.fireEvent.click(confirmButton);
                    title = rendered.queryByText(TITLE_TEXT);
                    description = rendered.queryByText(DESCRIPTION_TEXT);
                    expect(title).not.toBeInTheDocument();
                    expect(description).not.toBeInTheDocument();
                    return [2 /*return*/];
            }
        });
    }); });
    it("renders a verification input when verificationText is provided", function () { return __awaiter(void 0, void 0, void 0, function () {
        var input;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rendered.rerender(<DialogTest verificationText="delete"/>);
                    react_1.fireEvent.click(trigger);
                    return [4 /*yield*/, rendered.findByRole("textbox")];
                case 1:
                    input = _a.sent();
                    expect(input).toBeInTheDocument();
                    return [2 /*return*/];
            }
        });
    }); });
    it("renders a disabled confirm button when verificationText is provided", function () { return __awaiter(void 0, void 0, void 0, function () {
        var button;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rendered.rerender(<DialogTest verificationText={VERIFICATION_TEXT}/>);
                    react_1.fireEvent.click(trigger);
                    return [4 /*yield*/, rendered.findByText(CONFIRM_TEXT)];
                case 1:
                    button = _a.sent();
                    expect(button).toBeDisabled();
                    return [2 /*return*/];
            }
        });
    }); });
    it("renders an enabled confirm button when verificationText is provided and the input matches", function () { return __awaiter(void 0, void 0, void 0, function () {
        var input, button;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rendered.rerender(<DialogTest verificationText={VERIFICATION_TEXT}/>);
                    react_1.fireEvent.click(trigger);
                    return [4 /*yield*/, rendered.findByRole("textbox")];
                case 1:
                    input = _a.sent();
                    return [4 /*yield*/, rendered.findByText(CONFIRM_TEXT)];
                case 2:
                    button = _a.sent();
                    react_1.fireEvent.change(input, { target: { value: VERIFICATION_TEXT } });
                    expect(button).toBeEnabled();
                    return [2 /*return*/];
            }
        });
    }); });
});
