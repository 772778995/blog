const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('static', resolve('public/static'))
  },
  devServer: {
    port: '8080',
    open: true,
    proxy: {
      '/api': {
        target: 'https://d18c4217.cn/API',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
}
