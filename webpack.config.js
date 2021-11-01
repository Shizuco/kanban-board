var path = require('path');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'js'),
    compress: true,
    port: 9000
  }
};