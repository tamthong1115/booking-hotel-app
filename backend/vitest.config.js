"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("vitest/config");
const path_1 = __importDefault(require("path"));
exports.default = (0, config_1.defineConfig)({
    test: {
        globals: true,
        environment: "node",
    },
    resolve: {
        alias: {
            "@modules": path_1.default.resolve(__dirname, "src/modules"),
            "@middlewares": path_1.default.resolve(__dirname, "src/middlewares"),
            "@utils": path_1.default.resolve(__dirname, "src/utils"),
            "@config": path_1.default.resolve(__dirname, "src/config"),
            "@type": path_1.default.resolve(__dirname, "src/type"),
            "@shared": path_1.default.resolve(__dirname, "../shared"),
        },
    },
});
