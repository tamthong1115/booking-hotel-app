import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
    },
    resolve: {
        alias: {
            "@modules": path.resolve(__dirname, "src/modules"),
            "@utils": path.resolve(__dirname, "src/utils"),
            "@config": path.resolve(__dirname, "src/config"),
            "@types": path.resolve(__dirname, "src/types"),
            "@shared": path.resolve(__dirname, "src/shared"),
        },
    },
});
