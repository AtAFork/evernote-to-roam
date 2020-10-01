// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  mode: 'production',
  node: {
    fs: 'empty',
  },
  /*
   *  module: {
   *    rules: [
   *      {
   * test: /\.node$/,
   * loader: 'node-loader',
   *      },
   *    ],
   *  },
   */
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './assets/js'),
    filename: 'bundle.js',
  },
};
