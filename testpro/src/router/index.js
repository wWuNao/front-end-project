import Vue from 'vue'
import VueRouter from 'vue-router'
import loginView from '../components/Login.vue'
import HomeView from '@/components/Home'
import initialPageView from '@/components/initialPage'
import teacherGroupView from '@/components/teacherGroup'
import studentGroupView from '@/components/studentGroup'
import userView from '@/components/user'
import mainView from '@/components/main'
import classView from '@/components/class'
import userManageView from '@/components/userManage'
import roleView from '@/components/role'
Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:"/login"},
  {path:'/login',component:loginView},
  {path:'/home',component:HomeView,redirect:'/home',children:[{path:'/home',component:mainView},{path:'/tch_grp_manage',component:teacherGroupView},
  {path:'/stu_grp_manage',component:studentGroupView},{path:'/my',component:userView},{path:'/class_manage',component:classView},{path:'/user_manage',component:userManageView},
  {path:'/role_manage',component:roleView}]},
  {path:'/init',component:initialPageView},
]

const router = new VueRouter({
  mode:'history',
  routes
})




// 挂在路由导航守卫
router.beforeEach((to, from, next) => {
  //获取token;
  const tokenStr = window.sessionStorage.getItem('token');
  if(to.path==='/init') return next();
  if (to.path === '/login'&& tokenStr) return next("/home");
  if (to.path === '/login'&& !tokenStr) return next();
  if (!tokenStr) {
    return next('/login');
  }
  next();
})

export default router
