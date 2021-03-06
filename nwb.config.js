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
    }
  },
  babel: {
    presets: [
      '@babel/preset-flow'
    ]
  }
}