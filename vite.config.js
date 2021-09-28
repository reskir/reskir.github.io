const path = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, "main.js"),
            name: "main",
            fileName: () => "main.js",
        },
        sourcemap: "inline",
    },
});
