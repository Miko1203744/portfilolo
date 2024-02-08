const path = require("path");
const webpack = require("webpack");

module.exports = {
  
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
        
      },
    ],
    
  },
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "assert": require.resolve("assert/"),
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer"),
    }
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  ],
};