
// const { ModuleFederationPlugin } = require("webpack").container;

// module.exports = {
//   entry: "./src/index.js",
//   output: {
//     publicPath: "http://localhost:3001/", // URL where the remote app is served
//   },
//   devServer: {
//     port: 3001,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         loader: "babel-loader",
//         exclude: /node_modules/,
//       },
//     ],
//   },
//   plugins: [
//     new ModuleFederationPlugin({
//         name: "microfrontend",
//         filename: "remoteEntry.js",
//         exposes: {
//           "./App": "./src/App", // Ensure this path is correct
//         },
//         shared: {
//           react: { singleton: true, eager: true },
//           "react-dom": { singleton: true, eager: true },
//         },
//       }),
//   ],
// };

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
        path: path.resolve(__dirname, ".dist"),
        filename: "[name].bundle.js",
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, ".dist"),
        },
        open: true,
        port: 3001,
        historyApiFallback: true,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "microfrontend",
            filename: "remoteEntry.js",
            exposes: {
                "./App": "./src/App", // Ensure this path is correct
            },
            shared: {
                react: { singleton: true, eager: true },
                "react-dom": { singleton: true, eager: true },
            },
        }),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html", // Correct path to index.html
          })
    ],
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                include: path.resolve(__dirname, "src"),
                exclude: path.resolve(__dirname, "node_modules"),
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
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
            },
            {
                test: /\.(png|jpeg|gif|jpg)$/i,
                type: "asset/resource",
            },
        ],
    },
};