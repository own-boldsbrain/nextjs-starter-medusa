"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
var React = require("react");
var button_1 = require("@/components/button");
var text_1 = require("@/components/text");
var use_toggle_state_1 = require("./use-toggle-state");
var Demo = function () {
    var _a = (0, use_toggle_state_1.useToggleState)(), state = _a.state, open = _a.open, close = _a.close, toggle = _a.toggle;
    return (<div className="flex flex-col items-center gap-y-4">
      <text_1.Text>State: {state ? "True" : "False"}</text_1.Text>
      <div className="flex items-center gap-x-4">
        <button_1.Button onClick={open}>Open</button_1.Button>
        <button_1.Button onClick={close}>Close</button_1.Button>
        <button_1.Button onClick={toggle}>Toggle</button_1.Button>
      </div>
    </div>);
};
var meta = {
    title: "Hooks/useToggleState",
    component: Demo,
    parameters: {
        layout: "centered",
    },
};
exports.default = meta;
exports.Default = {};
