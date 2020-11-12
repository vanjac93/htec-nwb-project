var path = require('path')

module.exports = {
  type: 'react-app',
  npm: {
    esModules: true,
    umd: false
  },
  webpack: {
    publicPath: '/',
    aliases: {
      '~': path.resolve('src')
    },
    extra: {
      module: {
        rules: [
          {test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'}
        ]
      }
    }
  },
  babel: {
    presets: [
      '@babel/preset-flow'
    ]
  }
}