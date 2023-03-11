const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
    },
    entry: {
        'github-status': path.resolve(
            __dirname,
            'src',
            'github-page-status.js'
        ),
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
