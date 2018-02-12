import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import state from './state'
import actions from './actions'
import modules from './modules'
import getters from './getters'
Vue.use(Vuex)
let mod = {};
modules.forEach(item => mod[item.name] = item.value)
export default new Vuex.Store({
  modules : {
    ...mod
  },
  state,
  actions,
  getters,
  mutations
})
