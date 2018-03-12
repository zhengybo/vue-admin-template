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
      state.speedTabs.options.push({
        name :lang[payload.name],
        key : payload.name,
        path : payload.path,
        query : payload.query
      });
      state.speedTabs.default = payload.name;
    },
    UPDATE_TABS : (state,name) => {
      let options = state.speedTabs.options,
          i = options.findIndex(item => item.key == name);
      state.speedTabs.default = name;
          // 更新至第一个
      // options.push(...options.splice(i,1));
    },
    DELETE_TABS : (state,name) => {
      let options = state.speedTabs.options;
      options.splice(options.findIndex(item => item.key === name),1)
    },
    SET_NAMES : (state,names) => {
      state.names = names
    },
    'ADD_CACHE_VIEW' : (state, view) => {
      let cacheViews = state.cacheViews;
      if(!~cacheViews.indexOf(view)){
        cacheViews.push(view);
      }
    },
    'DEL_CACHE_VIEW' : (state, view) => {
      let cacheViews = state.cacheViews,
          index = cacheViews.indexOf(view);
      if(~index){
        cacheViews.splice(index,1);
      }
    },
    'SET_NUMBER' : (state, number) => {
      state.number = number;
      localStorage.setItem('TABS-NUMBER',number);
    }
  },
  actions: {
    queryTabs({state,commit},payload){
      let flag = state.speedTabs.options.some(item => item.key == payload.name);
      if(!flag){
        commit('ADD_CACHE_VIEW',payload.name);
        commit('ADD_TABS',payload);
      }else {
        commit('UPDATE_TABS',payload.name)
      }
    },
    deleteTabs({commit,state},payload){
      commit('DELETE_TABS',payload.name);
      // commit('DEL_CACHE_VIEW',payload.name);
      let options = state.speedTabs.options;
      // console.log(state.speedTabs.options.slice(-1));
      // return options[options.length-1];
      return state.speedTabs.options.slice(-1)[0];
    },
    addCacheView({commit,state},name){
      commit('ADD_CACHE_VIEW',name);
    },
    delCacheView({commit,state},name){
      commit('DEL_CACHE_VIEW',name);
    },
    setNumber({commit,state},number){
      commit('SET_NUMBER',number);
    }
  }
}
