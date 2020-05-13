const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require("webpack-merge");
const base = require("./base");
const path = require("path");
const { VueLoaderPlugin } = require('vue-loader')

module.exports = merge(base, {
  mode: "development",
  devtool: "source-map", // Mostar o source-map, permitindo o debug
  devServer: {
    host: "localhost",
    port: "40992",
    hot: true, // Atualiza do servidor se houver alterações no código
    compress: true, // Comprime (gzip) arquivos que são servidos
    contentBase: path.resolve(__dirname, "../../../../dist/webpack/vue"), // Local dos arquivos que o servidor serve
    watchContentBase: true, // "Watch" o conteúdo base para mudanças
    watchOptions: {
      ignored: /node_modules/ // Ignora alterações no /node_modules/
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../../../src/vue.index.dev.html"), // O arquivo html base do vue que será utilizado
      filename: "index.html" // O nome do arquivo de saída
    })
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
})