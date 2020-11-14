const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");
const EventHooksPlugin = require("event-hooks-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const env = dotenv.config({ path: "./client/env/dev.env" }).parsed;
const spawn = require("child_process").spawn;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  mode: "development",
  entry: {
    loader: ["@babel/polyfill", "./client/react/loader.jsx"],
  },
  node: {
    fs: "empty",
  },
  output: {
    filename: "bundle.js",
    chunkFilename: "[name].bundle.js",
    publicPath: "/",
    path: path.resolve(__dirname, "build"),
  },
  resolve: {
    extensions: [".js", ".jsx", ".styl"],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
  plugins: [

    new webpack.ProgressPlugin(),

    new webpack.WatchIgnorePlugin(["public"]),

    new EventHooksPlugin({
      watchRun: () => {
        spawn("node", ["./scripts/copy-static.js", "dev"], {
          stdio: "inherit",
        });
      },
    }),

    new webpack.DefinePlugin(envKeys),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.styl$/,
        include: path.join(__dirname, 'client'),
        use: ["style-loader", "css-loader", "stylus-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: "images/[hash]-[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf)$/,
        use: `file-loader?name=[path][hash].[ext]&context=${path.resolve(
          __dirname,
          "client"
        )}`,
      },
    ],
  },
  devtool: "cheap-module-eval-source-map",
};
