const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");
const AsyncChunkNames = require('webpack-async-chunk-names-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

const env = dotenv.config({path: "./client/env/prod.env"}).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

module.exports = {
    mode: "production",
    node: {
        fs: "empty"
    },
    watchOptions: {
        ignored: ['node_modules', 'scripts']
    },
    entry: {
        loader: ["@babel/polyfill", "./client/react/loader.jsx"]
    },
    output: {
        filename: 'bundle.js',
        chunkFilename: '[name].bundle.js',
        publicPath: "/",
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: [".js", ".jsx", ".styl"]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            parallel: 4,
            terserOptions: {
                compress: {
                    inline: true
                }
            }
        })],
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
    },
    devtool: false,
    plugins: [
        new webpack.ProgressPlugin(),
        new CopyWebpackPlugin([
            { from: 'public' , ignore: ["index.html"]}
        ]),
        new webpack.DefinePlugin(envKeys),
        new HtmlWebPackPlugin({
            inject: true,
            template: "./public/index.html",
            filename: "./index.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                preserveLineBreaks: true,
            }
        }),
        new AsyncChunkNames(),
    ],
    module: {
        rules: [

            {
                test: /\.html$/,
                include: path.join(__dirname, 'client'),
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [
                            require("@babel/plugin-transform-async-to-generator"),
                            require("@babel/plugin-transform-arrow-functions"),
                            require("@babel/plugin-transform-modules-commonjs")
                        ]
                    }
                }
            },
            {
                test: /\.(js|jsx)$/,
                include: path.join(__dirname, 'client'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"],
                        }
                    }
                ],
                // exclude: /node_modules/
            }, {
                test: /\.styl$/,
                include: path.join(__dirname, 'client'),
                use: [
                    "style-loader",
                    "css-loader",
                    "stylus-loader"
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|webp)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(eot|ttf|woff|woff2|otf)$/,
                use: `file-loader?name=[path][hash].[ext]&context=${path.resolve(__dirname, 'client')}`
            },
        ]
    }
};
