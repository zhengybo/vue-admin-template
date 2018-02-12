/**
 * 共性
 */
import defaultOptions from './config'
export default (name) => {
  const {events} = defaultOptions(name);
  let eventsFunctions = {};
  events.forEach(k => eventsFunctions[k] = function(){
    this.events[k] && this.events[k].call(this,...arguments);
  })
  return {
    props : {
      field : {
        type : Object,
        default(){
          return {}
        }
      },
      defaultValue : {
        type : Object,
        default(){
          return {}
        }
      },
      submitData : {
        type : Object,
        default(){
          return {}
        }
      }
    },
    data(){
      return {
        events : this.field.events || {}
      }
    },
    computed : {
    },
    created(){
      this.initDefaultAct();
    },
    methods : {
      ...eventsFunctions,
      initDefaultAct (){
        if(this.field.type){ // 类型统一小写
          // console.log(this.field.type);
          // this.field.type = this.field.type.toLocaleLowerCase()
        }
      }
    }
  }
}
