/**
 * 全局公用的一些请求数据缓存起来 (按需加载) 如公用下拉 多选数据等
 */

const selectNames = [ //初始化默认名字
  'alarmName'
]
export default {
  state : {
    selects : ((obj) => {
      selectNames.forEach(v => obj[v] = []);
      return obj;
    })({})
  },
  mutations : {
    SET_SELECT : (state,name) => {
      state.selects[name] = [{
          value: '选项1',
          name: '黄金糕'
        }, {
          value: '选项2',
          name: '双皮奶'
        }, {
          value: '选项3',
          name: '蚵仔煎'
        }];
    }
  },
  actions: {
    setSelect({commit},name){
      setTimeout(() => {
        commit('SET_SELECT',name)
      },3000)
    }
  },
  // getters : {
  //   selects(state){
  //     console.log(state);
  //     return  []
  //   }
  // }
}
