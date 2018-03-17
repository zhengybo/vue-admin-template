import { Cookie } from '@/js/public/tool'
import lang from '@/unit/lang'
let speedTabs = [];
try { //保证取到的正确值
  let v = Cookie.getCookie('SLIDE_TABS');
  speedTabs = Array.isArray(v) ? v : []
} catch(e){}
export default {
  state : {
    names : null,
    number : parseInt(localStorage.getItem('TABS-NUMBER')) || 5,// 每组tab的个数
    navigation : [],//导航
    speedTabs : {
      default : '',
      options : speedTabs
    },
    cacheViews : []
  },
  mutations : {
    ADD_TABS : (state,payload) => {
      // console.log(payload.cacheViews);
      state.speedTabs.options.push({
        name :lang[payload.name],
        key : payload.name,
        path : payload.path,
        query : payload.query,
        cacheViews : payload.cacheViews
      });
      state.speedTabs.default = payload.name;
    },
    UPADTE_QUERY : (state, payload) => {
      let tmp = state.speedTabs.options.find(item => item.key == payload.name);
      if(tmp){
        Object.assign(tmp.query,payload.query)
      }
    },
    UPDATE_TABS : (state,name) => {
      let options = state.speedTabs.options,
          i = options.findIndex(item => item.key == name);
      state.speedTabs.default = name;
          // 更新至第一个
      // options.push(...options.splice(i,1));
    },
    DELETE_TAB : (state,name) => {
      let options = state.speedTabs.options;
      options.splice(options.findIndex(item => item.key === name),1);

    },
    SET_NAMES : (state,names) => {
      state.names = names
    },
    ADD_CACHE_VIEW : (state, view) => {
      let cacheViews = state.cacheViews;
      if(!~cacheViews.indexOf(view)){
        cacheViews.push(view);
      }
    },
    DEL_CACHE_VIEW : (state, view) => {
      let cacheViews = state.cacheViews,
          index = cacheViews.indexOf(view);
      if(~index){
        cacheViews.splice(index,1);
      }
      console.log(cacheViews);
    },
    SET_NUMBER : (state, number) => {
      state.number = number;
      localStorage.setItem('TABS-NUMBER',number);
    }
  },
  actions: {
    queryTabs({state,commit},payload){
      let { name, cacheViews } = payload;
      let flag = state.speedTabs.options.some(item => item.key == name);
      if(!flag){
        cacheViews
        ? cacheViews.forEach(v => commit('ADD_CACHE_VIEW', v))
        : commit('ADD_CACHE_VIEW', name);
        commit('ADD_TABS',payload);
      }else {
        commit('UPDATE_TABS',name)
      }
    },
    updateQuery({commit},payload){
      commit('UPADTE_QUERY',payload)
    },
    deleteTab({commit,state},payload){
      commit('DELETE_TAB',payload.name);
      let options = state.speedTabs.options;
      return state.speedTabs.options.slice(-1)[0];
    },
    deleteTabs({commit,state},names){
      names.forEach(name => commit('DELETE_TAB',name));
      return state.speedTabs.options.slice(-1)[0];
    },
    addCacheView({commit,state},name){
      commit('ADD_CACHE_VIEW',name);
    },
    delCacheView({commit,state},name){
      let preLen = state.cacheViews.length
      commit('DEL_CACHE_VIEW',name);
      return preLen != state.cacheViews.length;
    },
    delCacheViews({commit,state},views = []){
      let preLen = state.cacheViews.length
      views.forEach(name => commit('DEL_CACHE_VIEW',name));
      return preLen != state.cacheViews.length;
    },
    setNumber({commit,state},number){
      commit('SET_NUMBER',number);
    }
  }
}
