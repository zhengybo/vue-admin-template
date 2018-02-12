
export default {
  state : {
    data : {}
  },
  mutations : {
    'SET_NAVIGATION' : (state, data) => {
      data['/main/home'].pop();//首页是个特殊的存在 需要移除
      Object.assign(state.data , data);
    }
  },
  actions: {
    setNavigation({commit},data){
      commit('SET_NAVIGATION',data)
    }
  }
}
