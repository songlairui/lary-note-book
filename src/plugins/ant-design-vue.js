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
  Modal,
  Divider
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
      Modal,
      Divider
    ]
    instances.forEach((instance) => {
      Vue.use(instance)
    })
  }
}
