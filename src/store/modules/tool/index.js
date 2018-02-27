/**
 * 小悬浮球
 */
import options from './options'
const computeOptions = (options , checked) => {
  options.forEach(item => item.status = !!~checked.indexOf(item.key));
  return options;
}

let top = localStorage.getItem('tool-top'),
    show = localStorage.getItem('SHOW-TOOLS'),
    tools = localStorage.getItem('TOOLS-CURRENT');
try {
  top = top ? top.trim() : '50%';
  show = show ? !!(+show.trim()) : true
  tools = tools ? tools.trim().split(',') : [] ;
} catch (e) {
  tools = [];
  localStorage.deleteItem('TOOLS-CURRENT');
}

export default {
  state : {
    show : show,
    top : top,
    options : computeOptions(options,tools),
    defaultOptions : tools
  },
  mutations : {
    SHOW_TOOLS : (state, show) => {
      state.show = show;
      localStorage.setItem('SHOW-TOOLS',show);
    },
    SET_TOP : (state, top) => {
      state.top = top;
      localStorage.setItem('tool-top',top);
    },
    SET_TOOLS : (state, tool = []) => {
      state.options = computeOptions(options, tool);
    }
  },
  actions: {
    setTop : ({commit},top) => commit('SET_TOP',top),
    setTools : ({commit},tool) => commit('SET_TOOLS',tool),
    showtools : ({commit},show) => commit('SHOW_TOOLS',show)
  }
}
