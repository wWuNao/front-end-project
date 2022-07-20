import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import store from './store'
import api from '@/assets/js/api'
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
    config.headers.token = `${sessionStorage.getItem("token")}`;
  }
  return config
}, function (error) {
  router.push('/login')
  return Promise.reject(error)
})


// 响应拦截器
// axios.interceptors.response.use((success) => {
//   if (success.status && success.status == 200) {
//     if (success.data.code == 500 || success.data.code == 401 || success.data.code == 403) {   //接口请求成功，业务逻辑错误
//       Message.error({ message: success.data.message });
//       return;
//     }
//     if (success.data.message) {
//       Message({ message: success.data.message });
//     }
//   }
//   return success.data;
// }, (error) => {
//   if (error.response.code == 504 || error.response.code == 404) {
//     Message.error({ message: '服务器被吃了( ╯□╰ )' });
//   } else if (error.response.code == 403) {
//     Message.error({ message: '权限不足，请联系管理员' });
//   } else if (error.response.code == 401) {
//     Message.error({ message: '请登录账号' });
//     router.replace('/');
//   } else {
//     if (error.response.message) {
//       Message({ message: error.response.message });
//     } else {
//       Message({ message: '该错误触及盲区(●ˇ∀ˇ●)' });
//     }
//   }
// });

