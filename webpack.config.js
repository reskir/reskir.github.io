module.exports = {
  // webpack folder's entry js - excluded from jekll's build process.
  entry: {
    main: "./src/entries/mainpage.js",
    about: "./src/entries/about.js"
  },
  output: {
    // we're going to put the generated file in the assets folder so jekyll will grab it.
    path: __dirname + "/assets/javascripts/",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015"]
        }
      }
    ]
  },
  watch: true
};
