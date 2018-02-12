import store from '@/store'
import NProgress from 'nprogress'
export default {
  state : {
    reload : true
  },
  mutations : {
    'RELOAD_ROUTER' : (state,name) => {
      state.reload = false
      NProgress.start();
      setTimeout(() => { //增加刷新显示变化效果
        store.dispatch('delCacheView',name).then(() => {
          $_Vue.$nextTick()
          .then(() => state.reload = true)
          .then(() => {
            $_Vue.$route.meta.cache && store.dispatch('addCacheView',name)
          });
          NProgress.done();
        },200);
      })
    }
  },
  actions: {
    reloadRouter({commit},name){
      commit('RELOAD_ROUTER',name)
    }
  }
}
