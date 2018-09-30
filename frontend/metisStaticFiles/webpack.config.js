const path = require('path');

module.exports = {
  mode: "development",
  entry: "./src",
  output: {
    path: path.resolve(__dirname, "../../backend/metis/document/static/document/dist/js"), // string
    filename: "bundle.js",
    publicPath: "/assets/",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: "source-map", // enum  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.
  context: __dirname, // string (absolute path!)
  target: "web", // enum  // the environment in which the bundle should run
  serve: { //object
    port: 1337,
    content: './dist',
  },
  // lets you provide options for webpack-serve
  stats: "errors-only",  // lets you precisely control what bundle information gets displayed
}