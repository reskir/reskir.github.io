const path = require('path');
const { defineConfig } = require('vite');

module.exports = defineConfig({
    build: {
        watch: true,
        lib: {
            entry: path.resolve(__dirname, 'main.js'),
            name: 'main',
            formats: ['es'],
            fileName: () => 'main.js',
        },
        sourcemap: 'inline',
        outDir: './assets/javascript/',
    },
});
