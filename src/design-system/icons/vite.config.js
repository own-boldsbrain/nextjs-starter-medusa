"use strict";
/// <reference types="vitest" />
/// <reference types="vite/client" />
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_react_1 = require("@vitejs/plugin-react");
var vite_1 = require("vite");
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_react_1.default)()],
    test: {
        setupFiles: "./setup-test.ts",
        coverage: {
            all: true,
            reporter: ["lcov", "text"],
            include: ["src/**"],
            exclude: ["**/*.stories.tsx", "**/index.ts"], // exclude stories and index files
        },
        globals: true,
        environment: "jsdom",
        css: false,
    },
});
