const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'unc-react-component-base.js',
    library: 'uncReactComponentBase',
    libraryTarget: 'umd',
    publicPath: '/dist/',
    umdNamedDefine: true
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
      modernizr$: path.resolve(__dirname, ".modernizrrc.js"),
      'react': path.resolve(__dirname, "./node_modules/react"),
      'react-dom': path.resolve(__dirname, "./node_modules/react-dom")
    }
  },
  externals: {
    "react": {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM"
    }
  },
  target: 'web',
  mode: 'production'
}
