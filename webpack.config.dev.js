const path = require('path');

module.exports = {
  entry: './example/index.js',
  output: {
    path: path.resolve(__dirname, 'example/dist'),
    filename: 'unc-react-component-base.js'
  },
  module: {
    rules: [
      {
        test:/\.jsx?$/,
        exclude: /(node_modules)/,
        use: [ 'babel-loader', 'eslint-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.modernizrrc\.js$/,
        exclude: /(node_modules)/,
        loader: "webpack-modernizr-loader"
      }
    ]
  },
  resolve: {
    alias: {
      modernizr$: path.resolve(__dirname, ".modernizrrc.js")
    }
  },
  target: 'web',
  mode: 'development'
}
