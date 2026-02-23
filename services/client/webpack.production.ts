import path from "path";

import { Configuration, ProvidePlugin } from "webpack";
import DotEnvPlugin from "dotenv-webpack";
import CopyPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import WebpackBar from "webpackbar";

const config: Configuration = {
  mode: "production",
  devtool: "source-map",
  entry: {
    main: ["./src"],
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    modules: ["node_modules"],
    fallback: {
      path: require.resolve("path-browserify"),
      crypto: require.resolve("crypto-browserify"),
      "process/browser": require.resolve("process/browser"),
      stream: false,
      vm: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ttf|woff|woff2|eot|gif|png|ico)(\?.+)?$/,
        type: "asset/resource",
        generator: { filename: "[name].[ext]?[hash]" },
      },
      {
        test: /\.svg$/i,
        type: "asset",
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: ["@svgr/webpack"],
      },
      {
        test: /\.[tj]sx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
    new DotEnvPlugin({
      path: `.env.${process.env.NODE_ENV}`,
      systemvars: true,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CopyPlugin({
      patterns: [{ from: "./static", to: "./" }],
    }),
    new WebpackBar(),
  ],
  performance: {
    hints: false,
  },
  stats: "errors-only",
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        // Only split @mui; keep @emotion in main to avoid "reading 'call'" in production
        default: false,
        defaultVendors: false,
        mui: {
          test: /[\\/]node_modules[\\/]@mui[\\/]/,
          name: "mui",
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  watchOptions: {
    aggregateTimeout: 0,
  },
};

export default config;
