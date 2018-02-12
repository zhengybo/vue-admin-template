/**
 * 主题色
 */
export default {
  state : {
    theme : localStorage.getItem('theme-color') || '#409EFF',
    ratio : document.querySelector('meta').getAttribute('theme-style')
                    .split(',').map(v => parseFloat(v))
    // ratio : [0.9,0.25,0.15]
  },
  mutations : {
    SET_THEME : (state,color) => {
      localStorage.setItem('theme-color',color);
      state.theme = color;
    }
  },
  actions: {
    setTheme : ({commit},color) => commit('SET_THEME',color)
  }
}
