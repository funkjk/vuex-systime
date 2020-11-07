const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

module.exports = {
  mode: 'none',
  entry: path.resolve(__dirname + '/src/vuex-systime.js'),
  output: {
    filename: 'vuex-systime.js',
    libraryTarget: 'umd',
    library: 'vuex-systime',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      }
    ]
  },
  externals: {
    vuex: 'vuex'
  }
}