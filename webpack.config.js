/* eslint-disable */
const path = require(`path`);
module.exports = {
  entry: `./src/index.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      }
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    compress: false,
    port: 8000,
  },
  devtool: `source-map`
};
