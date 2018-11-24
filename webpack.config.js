const path = require("path");

const serverConfig = {
  mode: "production",
  entry: "./src/lib/index.js",
  target: "node",
  output: {
    library: "stama",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "dist"),
    filename: "stama.node.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/env",
              {
                targets: {
                  node: "current"
                }
              }
            ]
          ]
        }
      }
    ]
  }
};

const clientConfig = {
  entry: "./src/lib/index.js",
  target: "web",
  output: {
    library: "stama",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "dist"),
    filename: "stama.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env"]
        }
      }
    ]
  }
};

module.exports = [serverConfig, clientConfig];
