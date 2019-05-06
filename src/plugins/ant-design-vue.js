import { Pagination, Button } from 'ant-design-vue'
import { LocaleProvider } from 'ant-design-vue'

export default {
  install(Vue) {
    const instances = [Pagination, Button, LocaleProvider]
    instances.forEach((instance) => {
      Vue.use(instance)
    })
  }
}
