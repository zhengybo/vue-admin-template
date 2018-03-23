import store from '@/store'
export default {
  selects : (state,getters) => {
    if(!state.global.selects['alarmName'].length){
      store.dispatch('setSelect','alarmName');
      return {};
    }
    return state.global.selects['alarmName'];
  }
}
