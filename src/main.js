import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueRx from 'vue-rx'
import AntVue from './plugins/ant-design-vue.js'
import apolloProvider from './plugins/apollo-client'
import Guard from './plugins/guard'
import LoginState from './mixins/login-state'
import './registerServiceWorker'
import './main.less'

Vue.use(Guard, { router, store })

Vue.use(VueRx)
Vue.use(AntVue)
Vue.mixin(LoginState)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App)
}).$mount('#app')
