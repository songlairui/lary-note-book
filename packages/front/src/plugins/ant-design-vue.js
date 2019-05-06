import {
  message,
  Pagination,
  Button,
  LocaleProvider,
  List,
  Card,
  Row,
  Col,
  Popconfirm,
  Icon,
  Input,
  Popover,
  Radio,
  Modal
} from 'ant-design-vue'

export default {
  install(Vue) {
    Vue.prototype.$message = message
    const instances = [
      Pagination,
      Button,
      LocaleProvider,
      List,
      Card,
      Row,
      Col,
      Popconfirm,
      Icon,
      Input,
      Popover,
      Radio,
      Modal
    ]
    instances.forEach((instance) => {
      Vue.use(instance)
    })
  }
}
