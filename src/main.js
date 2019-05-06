import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'
import VueRx from 'vue-rx';
import AntVue from './plugins/ant-design-vue.js'

Vue.use(VueRx);
Vue.use(AntVue);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
