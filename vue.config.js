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
  chainWebpack: () => {
    console.group()
    console.info('VUE_APP_GRAPHQL_HTTP:', process.env.VUE_APP_GRAPHQL_HTTP)
    console.groupEnd()
  }
}
