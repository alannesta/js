module.exports = {
    entry: "./xmd/index_webpack.js",
    output: {
        path: './dist',
        filename: "webpack_bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
};
