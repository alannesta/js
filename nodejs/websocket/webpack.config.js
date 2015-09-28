var webpack = require('webpack');

module.exports = {
    entry: {
        benchmark: "./static/scripts/benchmark.js",
        board: "./static/scripts/board.js",
        app: "./static/scripts/app.js",
        vendor: ["jquery"]
    },
    output: {
        path: './static/dist',
        filename: "[name].js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ],

        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendor",
                filename: "vendor.js",
                minChunks: 3,
                chunks: ["benchmark", "board", "app"]
            })
        ]
    }
};