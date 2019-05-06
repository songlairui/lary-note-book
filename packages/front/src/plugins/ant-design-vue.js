import { message, Pagination, Button, LocaleProvider } from 'ant-design-vue'

export default {
  install(Vue) {
    Vue.prototype.$message = message
    const instances = [Pagination, Button, LocaleProvider]
    instances.forEach((instance) => {
      Vue.use(instance)
    })
  }
}
