const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env) => ({
    mode: env.production ? "production" : "development",
    externals: {
        react: "React",
        "react-dom": "ReactDOM",
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
    },
    entry: {
        "github-status": path.resolve(
            __dirname,
            "src",
            "github-page-status.tsx"
        ),
        main: path.resolve(__dirname, "main.ts"),
        "cv-export": path.resolve(__dirname, "src", "cv-export.ts"),
    },
    output: {
        path: path.resolve(__dirname, "assets/javascript"),
        filename: "[name].js",
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
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(jsx|js)$/,
                include: path.resolve(__dirname, "src"),
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        targets: "defaults",
                                    },
                                ],
                                "@babel/preset-react",
                            ],
                        },
                    },
                ],
            },
        ],
    },
});
