const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
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
          'primary-color': '#1a423f',
          'link-color': '#804766',
          // 'border-radius-base': '2px',
          // white: '#000',
          // black: '#fff',
          // 'body-background': '#000',
          // 'component-background': '#000',
          // 'heading-color': 'fade(#fff, 85%)',
          // 'text-color': 'fade(#fff, 65%)',
          // 'text-color-secondary': 'fade(#fff, 45%)',
          // 'heading-color-dark': 'fade(#000, 100%)',
          // 'text-color-dark': 'fade(#000, 85%)',
          // 'text-color-secondary-dar': 'fade(#000, 65%)',
          // 'disabled-color': 'fade(#fff, 25%)',
          // 'disabled-color-dark': 'fade(#000, 35%)',
          // 'btn-primary-color': '#000',
          // 'btn-default-bg': '#000',
          // 'checkbox-check-color': '#000',
          // 'layout-trigger-color': '#000',
          // 'layout-sider-background-light': '#000',
          // 'layout-trigger-background-light': '#000',
          // 'input-bg': '#000',
          // 'popover-bg': '#000',
          // 'back-top-color': '#000',
          // 'avatar-color': '#000',
          // 'tree-directory-selected-color': '#000',
          // 'skeleton-color': '#2f2f2f'
        },
        javascriptEnabled: true
      }
    }
  },

  chainWebpack: (config) => {
    console.group()
    console.info('\nVUE_APP_GRAPHQL_HTTP:', process.env.VUE_APP_GRAPHQL_HTTP)
    var externals = {
      'vue-router': 'VueRouter',
      vue: 'Vue',
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
  },

  pwa: {
    name: "Lary's Note",
    themeColor: '#000000'
  }
}
