const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require("webpack-merge");
const base = require("./base");
const path = require("path");
const { VueLoaderPlugin } = require('vue-loader')

module.exports = merge(base, {
  mode: "production",
  devtool: "nosources-source-map",
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../../../src/vue.index.prod.html"),
      filename: "index.html"
    })
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
})