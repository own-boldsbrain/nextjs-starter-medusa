"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@testing-library/react");
var use_toggle_state_1 = require("./use-toggle-state");
describe("useToggleState", function () {
    test("should return a state and a function to toggle it", function () {
        var result = (0, react_1.renderHook)(function () { return (0, use_toggle_state_1.useToggleState)(); }).result;
        expect(result.current[0]).toBe(false);
        expect(typeof result.current[1]).toBe("function");
    });
    test("should return a state and a function to toggle it with an initial value", function () {
        var result = (0, react_1.renderHook)(function () { return (0, use_toggle_state_1.useToggleState)(true); }).result;
        expect(result.current[0]).toBe(true);
    });
    test("should update the state when the toggle function is called", function () {
        var result = (0, react_1.renderHook)(function () { return (0, use_toggle_state_1.useToggleState)(); }).result;
        expect(result.current[0]).toBe(false);
        (0, react_1.act)(function () {
            result.current[1]();
        });
        expect(result.current[0]).toBe(true);
    });
    test("should update the state when the close function is called", function () {
        var result = (0, react_1.renderHook)(function () { return (0, use_toggle_state_1.useToggleState)(true); }).result;
        expect(result.current[0]).toBe(true);
        (0, react_1.act)(function () {
            result.current[2]();
        });
        expect(result.current[0]).toBe(false);
    });
    test("should update the state when the open function is called", function () {
        var result = (0, react_1.renderHook)(function () { return (0, use_toggle_state_1.useToggleState)(); }).result;
        expect(result.current[0]).toBe(false);
        (0, react_1.act)(function () {
            result.current[3]();
        });
        expect(result.current[0]).toBe(true);
    });
});
