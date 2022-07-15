import Vue from 'vue'
import VueRouter from 'vue-router'
import loginView from '../components/Login.vue'
import HomeView from '@/components/Home'
import initialPageView from '@/components/initialPage'
Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:"/login"},
  {path:'/login',component:loginView},
  {path:'/home',component:HomeView},
  {path:'/init',component:initialPageView},
]

const router = new VueRouter({
  mode:'history',
  routes
})




// 挂在路由导航守卫
router.beforeEach((to, from, next) => {
  if(to.path==='/init') return next();
  if (to.path === '/login') return next();
  //获取token;
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) {
    return next('/login');
  }
  next();
})

export default router
