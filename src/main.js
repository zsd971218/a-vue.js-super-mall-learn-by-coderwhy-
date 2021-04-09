import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入toast插件
import 'components/common/toast/toast.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
