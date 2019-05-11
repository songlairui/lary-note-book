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
    console.info('\nVUE_APP_GRAPHQL_HTTP:', process.env.VUE_APP_GRAPHQL_HTTP)
    var externals = {
      vue: 'Vue',
      axios: 'axios',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      moment: 'moment'
    }
    const cdn = {
      css: [
        // element-ui css
        // '//unpkg.com/element-ui/lib/theme-chalk/index.css'
      ],
      js: [
        // vue
        '//cdn.jsdelivr.net/npm/vue',
        // vue-router
        '//cdn.jsdelivr.net/npm/vue-router',
        // vuex
        '//cdn.jsdelivr.net/npm/vuex',
        // axios
        '//cdn.jsdelivr.net/npm/axios',
        '//cdn.jsdelivr.net/npm/moment'
      ]
    }

    if (process.env.NODE_ENV === 'production') {
      console.info('use externals')
      config.externals(externals)

      config.plugin('html').tap((args) => {
        args[0].cdn = cdn
        return args
      })
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
