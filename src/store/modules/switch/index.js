/**
 * 小拉灯
 * 侧边栏
 */

let openSwitch = localStorage.getItem('OPEN-SWITCH'),
    collapseSwitch = localStorage.getItem('COLLAPSE-SWITCH');
export default {
  state : {
    open : openSwitch === null ? true : !!+openSwitch,
    collapse : openSwitch === null ? false : !+collapseSwitch,
    onlyOpenActive : true // 展开时仅仅打开当前项 否则打开收缩前的状态项
  },
  mutations : {
    TOGGLE_SWITCH : (state, open) => {
      state.open = open === undefined ? !state.open : open;
    },
    TOGGLE_COLLAPSE : (state, collapse) => {
      state.collapse = collapse === undefined ? !state.collapse : collapse;
    }
  },
  actions: {
    toggleSwitch : ({commit,state},open) => {
      commit('TOGGLE_SWITCH',open);
      return state.open;
    },
    toggleCollapse : ({commit,state},collapse) => {
      commit('TOGGLE_COLLAPSE',collapse);
      return state.collapse;
    }
  }
}
