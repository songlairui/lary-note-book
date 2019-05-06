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
    config.resolve.symlinks(true)
  }
}
