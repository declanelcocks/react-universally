const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /([\w\-/]+\.(?:eot|woff|ttf|otf|ico|jpeg|png|jpg))/,
        use: 'file-loader?name=[path][name].[ext]',
      },
      {
        test: /([\w\-/]+\.(?:svg))/,
        use: 'raw-loader?name=[path][name].[ext]',
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, '../node_modules'), 'node_modules'],
  },
}
