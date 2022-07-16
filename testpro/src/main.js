import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import store from './store'
// import jquery from '@/assets/js/jquery-3.6.0'
Vue.prototype.$http = axios
// axios.defaults.baseURL='http://localhost:62887/'



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
