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
            "@middlewares": path.resolve(__dirname, "src/middlewares"),
            "@utils": path.resolve(__dirname, "src/utils"),
            "@config": path.resolve(__dirname, "src/config"),
            "@type": path.resolve(__dirname, "src/type"),
            "@shared": path.resolve(__dirname, "../shared"),
        },
    },
});
