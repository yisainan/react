var Webpack = require("webpack");
module.exports = {
  entry: "./entry.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }, { test: /\.(png|jpg)$/, loader: "url-loader?limit=8192" } ]
  },
  plugins: [
    new Webpack.BannerPlugin("这里是打包文件头部注释")
  ]
}
