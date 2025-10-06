"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
var dotenv_1 = require("dotenv");
var path_1 = require("path");
var figma_1 = require("./figma");
dotenv_1.default.config({ path: (0, path_1.resolve)(process.cwd(), ".env") });
var accessToken = process.env.FIGMA_TOKEN || "";
if (!accessToken) {
    throw new Error("FIGMA_TOKEN is not defined");
}
exports.client = new figma_1.default({
    accessToken: accessToken,
    maxRetries: 3,
});
