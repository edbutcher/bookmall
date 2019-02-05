const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');

module.exports = (env) => {
    const isDevelopment = env.mode !== 'production';

    return {
        mode: env.mode,
        entry: {
            bundle: './src/index.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist')
        },
        devtool: isDevelopment && 'source-map',
        module: {
            rules: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.html$/,
                    use: [{
                        loader: "html-loader",
                        options: {
                            minimize: true
                        }
                    }]
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: isDevelopment,
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                autoprefixer: {
                                    browsers: ["last 2 versions"]
                                },
                                sourceMap: isDevelopment,
                                plugins: () => [
                                    autoprefixer
                                ]
                            },
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: isDevelopment,
                            }
                        }
                    ]
                },
                {
                    test: /\.(svg|jpg|png|gif)$/,
                    use: [{
                            loader: "file-loader",
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'static/images/',
                                useRelativePath: true,
                            }
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65
                                },
                                optipng: {
                                    enabled: true,
                                },
                                pngquant: {
                                    quality: '65-90',
                                    speed: 4
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                                webp: {
                                    quality: 75
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [{
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'static/fonts'
                            }
                        }

                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name]-styles.css",
                chunkFilename: "[id].css"
            }),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                filename: "./index.html",
                minify: !isDevelopment && {
                    html5: true,
                    collapseWhitespace: true,
                    caseSensitive: true,
                    removeComments: true,
                    removeEmptyElements: true
                },
            })
        ]
    }
};