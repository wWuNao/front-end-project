import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const state= null !=window.sessionStorage.getItem('state')?JSON.parse(window.sessionStorage.getItem('state')):{
  loginInfo:{}
}
export default new Vuex.Store({
  // 存储对象---共公state对象,存储所有组件的状态
  state,
  // 唯一取值的方法，计算属性
  getters: {
    // 获取菜单栏内容
    getMenuBarContents(state){
      return state.loginInfo
    }
  },
  // 唯一可以修改state值的方法，同步阻塞
  mutations: {
    updateLoginInfo(state,loginInfo){
      state.loginInfo=loginInfo
    }
  },
  // 异步调用mutations方法 context:上下文
  actions: {
    asyncupdateLoginInfo(context,loginInfo){
      context.commit('updateLoginInfo',loginInfo)
    }
  },
  modules: {
  }
})
