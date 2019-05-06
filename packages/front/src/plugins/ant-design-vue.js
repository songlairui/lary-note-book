import {
  message,
  Pagination,
  Button,
  LocaleProvider,
  List,
  Card,
  Row,
  Col
} from 'ant-design-vue'

export default {
  install(Vue) {
    Vue.prototype.$message = message
    const instances = [Pagination, Button, LocaleProvider, List, Card, Row, Col]
    instances.forEach((instance) => {
      Vue.use(instance)
    })
  }
}
