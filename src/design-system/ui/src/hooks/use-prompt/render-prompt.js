"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderPrompt = void 0;
var React = require("react");
var input_1 = require("@/components/input");
var label_1 = require("@/components/label");
var prompt_1 = require("@/components/prompt");
var RenderPrompt = function (_a) {
    var 
    /**
     * @ignore
     */
    open = _a.open, 
    /**
     * The variant of the prompt.
     */
    _b = _a.variant, 
    /**
     * The variant of the prompt.
     */
    variant = _b === void 0 ? "danger" : _b, 
    /**
     * The prompt's title.
     */
    title = _a.title, 
    /**
     * The prompt's description.
     */
    description = _a.description, 
    /**
     * The text the user has to input in order to confirm the action.
     */
    verificationText = _a.verificationText, 
    /**
     * The instruction for the verification text. Useful for passing a translated string to use instead of the default english one.
     * Should be in the format: "Please type {val} to confirm:"
     */
    _c = _a.verificationInstruction, 
    /**
     * The instruction for the verification text. Useful for passing a translated string to use instead of the default english one.
     * Should be in the format: "Please type {val} to confirm:"
     */
    verificationInstruction = _c === void 0 ? "Please type {val} to confirm:" : _c, 
    /**
     * The label for the Cancel button.
     */
    _d = _a.cancelText, 
    /**
     * The label for the Cancel button.
     */
    cancelText = _d === void 0 ? "Cancel" : _d, 
    /**
     * Label for the Confirm button.
     */
    _e = _a.confirmText, 
    /**
     * Label for the Confirm button.
     */
    confirmText = _e === void 0 ? "Confirm" : _e, 
    /**
     * @ignore
     */
    onConfirm = _a.onConfirm, 
    /**
     * @ignore
     */
    onCancel = _a.onCancel;
    var _f = React.useState(""), userInput = _f[0], setUserInput = _f[1];
    var handleUserInput = function (event) {
        setUserInput(event.target.value);
    };
    var validInput = React.useMemo(function () {
        if (!verificationText) {
            return true;
        }
        return userInput === verificationText;
    }, [userInput, verificationText]);
    var handleFormSubmit = function (event) {
        event.preventDefault();
        if (!verificationText) {
            return;
        }
        if (validInput) {
            onConfirm();
        }
    };
    React.useEffect(function () {
        var handleEscape = function (event) {
            if (event.key === "Escape" && open) {
                onCancel();
            }
        };
        document.addEventListener("keydown", handleEscape);
        return function () {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [onCancel, open]);
    var instructionParts = verificationInstruction.includes("{val}")
        ? verificationInstruction.split("{val}")
        : ["Please type", "to confirm:"];
    if (instructionParts.length !== 2) {
        instructionParts = ["Please type", "to confirm:"];
    }
    return (<prompt_1.Prompt open={open} variant={variant}>
      <prompt_1.Prompt.Content>
        <form onSubmit={handleFormSubmit}>
          <prompt_1.Prompt.Header>
            <prompt_1.Prompt.Title>{title}</prompt_1.Prompt.Title>
            <prompt_1.Prompt.Description>{description}</prompt_1.Prompt.Description>
          </prompt_1.Prompt.Header>
          {verificationText && (<div className="border-ui-border-base mt-6 flex flex-col gap-y-4 border-y p-6">
              <label_1.Label htmlFor="verificationText" className="text-ui-fg-subtle">
                {instructionParts[0]}{" "}
                <span className="text-ui-fg-base txt-compact-medium-plus">
                  {verificationText}
                </span>{" "}
                {instructionParts[1]}
              </label_1.Label>
              <input_1.Input autoFocus autoComplete="off" id="verificationText" placeholder={verificationText} onChange={handleUserInput}/>
            </div>)}
          <prompt_1.Prompt.Footer>
            <prompt_1.Prompt.Cancel onClick={onCancel}>{cancelText}</prompt_1.Prompt.Cancel>
            <prompt_1.Prompt.Action disabled={!validInput} type={verificationText ? "submit" : "button"} onClick={verificationText ? undefined : onConfirm}>
              {confirmText}
            </prompt_1.Prompt.Action>
          </prompt_1.Prompt.Footer>
        </form>
      </prompt_1.Prompt.Content>
    </prompt_1.Prompt>);
};
exports.RenderPrompt = RenderPrompt;
exports.RenderPrompt.displayName = "RenderPrompt";
