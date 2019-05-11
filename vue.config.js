const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  lintOnSave: false,

  pluginOptions: {
    apollo: {
      enableMocks: false,
      enableEngine: false
    }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#1DA57A',
          'link-color': '#1DA57A',
          'border-radius-base': '2px'
        },
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: (config) => {
    console.group()
    console.info('VUE_APP_GRAPHQL_HTTP:', process.env.VUE_APP_GRAPHQL_HTTP)
    if (process.env.NODE_ENV === 'production') {
      console.info('use gzip')
      config
        .plugin('compression')
        .use(CompressionPlugin, {
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          cache: true
        })
        .tap(() => {})
    }
    console.groupEnd()
  }
}
