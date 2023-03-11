const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
    },
    entry: {
        app: path.resolve(__dirname, 'src', 'index.js'),
        main: path.resolve(__dirname, 'main.js'),
    },
    output: {
        path: path.resolve(__dirname, 'assets/javascript'),
        filename: '[name].js',
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: 'defaults',
                                    },
                                ],
                                '@babel/preset-react',
                            ],
                        },
                    },
                ],
            },
        ],
    },
};
