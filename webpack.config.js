const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
    return {
        mode: env.mode,
        devtool: "source-map",
        entry: './src/index.js',
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.html$/,
                    use: [
                      {
                        loader: "html-loader",
                        options: { minimize: true }
                      }
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader"
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
              template: "./src/index.html",
              filename: "./index.html"
            })
        ]
    }
};