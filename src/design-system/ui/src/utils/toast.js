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
exports.toast = void 0;
var toast_1 = require("@/components/toast");
var React = require("react");
var sonner_1 = require("sonner");
var DEFAULT_TOAST_POSITION = "top-right";
function create(variant, title, props) {
    if (props === void 0) { props = {}; }
    var external = {
        position: props.position,
        duration: props.duration,
        dismissible: props.dismissable,
    };
    if (props.id) {
        external.id = props.id;
    }
    return sonner_1.toast.custom(function (t) {
        return (<toast_1.Toast id={t} title={title} description={props.description} dismissable={props.dismissable} variant={variant} action={props.action} icon={props.icon}/>);
    }, external);
}
function message(
/**
 * The title of the toast.
 */
title, 
/**
 * The props of the toast.
 */
props) {
    if (props === void 0) { props = {
        position: DEFAULT_TOAST_POSITION,
    }; }
    return create("message", title, props);
}
function custom() {
    return create("message", "Custom");
}
function info(
/**
 * The title of the toast.
 */ title, 
/**
 * The props of the toast.
 */
props) {
    if (props === void 0) { props = {
        position: DEFAULT_TOAST_POSITION,
    }; }
    return create("info", title, props);
}
function error(
/**
 * The title of the toast.
 */ title, 
/**
 * The props of the toast.
 */
props) {
    if (props === void 0) { props = {
        position: DEFAULT_TOAST_POSITION,
    }; }
    return create("error", title, props);
}
function success(
/**
 * The title of the toast.
 */ title, 
/**
 * The props of the toast.
 */
props) {
    if (props === void 0) { props = {
        position: DEFAULT_TOAST_POSITION,
    }; }
    return create("success", title, props);
}
function warning(
/**
 * The title of the toast.
 */ title, 
/**
 * The props of the toast.
 */
props) {
    if (props === void 0) { props = {
        position: DEFAULT_TOAST_POSITION,
    }; }
    return create("warning", title, props);
}
function loading(
/**
 * The title of the toast.
 */ title, 
/**
 * The props of the toast.
 */
props) {
    if (props === void 0) { props = {
        position: DEFAULT_TOAST_POSITION,
    }; }
    return create("loading", title, __assign(__assign({}, props), { dismissable: false }));
}
function createUniqueID() {
    return Math.random().toString(36).slice(2, 8);
}
function promise(
/**
 * The promise to be resolved.
 */
promise, 
/**
 * The props of the toast.
 */
props) {
    return __awaiter(this, void 0, void 0, function () {
        var id, shouldDismiss, p;
        return __generator(this, function (_a) {
            id = props.id || createUniqueID();
            shouldDismiss = id !== undefined;
            id = create("loading", typeof props.loading === "string" ? props.loading : props.loading.title, {
                id: id,
                position: props.position,
                description: typeof props.loading === "string"
                    ? undefined
                    : props.loading.description,
                duration: Infinity,
                dismissable: false,
            });
            p = promise instanceof Promise ? promise : promise();
            p.then(function () {
                shouldDismiss = false;
                create("success", typeof props.success === "string" ? props.success : props.success.title, {
                    id: id,
                    position: props.position,
                    description: typeof props.success === "string"
                        ? undefined
                        : props.success.description,
                });
            })
                .catch(function () {
                shouldDismiss = false;
                create("error", typeof props.error === "string" ? props.error : props.error.title, {
                    id: id,
                    position: props.position,
                    description: typeof props.error === "string"
                        ? undefined
                        : props.error.description,
                });
            })
                .finally(function () {
                if (shouldDismiss) {
                    sonner_1.toast.dismiss(id);
                    id = undefined;
                }
            });
            return [2 /*return*/, id];
        });
    });
}
exports.toast = Object.assign(message, {
    info: info,
    error: error,
    warning: warning,
    success: success,
    promise: promise,
    loading: loading,
    dismiss: sonner_1.toast.dismiss,
});
