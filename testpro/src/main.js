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




// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 判断是否存在token,如果存在将每个页面header添加token
  if (sessionStorage.getItem("token")) {
    config.headers.common['token'] = sessionStorage.getItem("token");
  }
  return config
}, function (error) {
  router.push('/login')
  return Promise.reject(error)
})

