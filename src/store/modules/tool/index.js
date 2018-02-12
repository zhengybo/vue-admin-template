/**
 * 小悬浮球
 */
let top = localStorage.getItem('tool-top');
top = top ? top : '50%';
export default {
  state : {
    show : true,
    top : top
  },
  mutations : {
    SET_TOP : (state, top) => {
      state.top = top;
      localStorage.setItem('tool-top',top)
    }
  },
  actions: {
    setTop : ({commit},top) => commit('SET_TOP',top)
  }
}
