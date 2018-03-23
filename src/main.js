import Vue from 'vue'
import App from './App'
import router from './router'
import { http , https } from '@/js/public/http'
import mixin from './mixin';
import store  from './store'
import VueLazyload  from 'vue-lazyload';

import './icons'
import '@/assets/css/family.css' //需要单独引入
// import ElementUI from 'element-ui'
// 注意 开发用这个 调试比较快
// if(process.env.NODE_ENV == 'development'){
//   require('element-ui/lib/theme-chalk/index.css');
// }
// Vue.use(ElementUI)
Vue.use(VueLazyload,{lazyComponent: true});
Vue.config.productionTip = false
require('@/js/components/index.js').default(Vue) //注册全局组件
window.$_Vue = new Vue({ //一些地方 无法取到vue实例 放到全局待使用
  el: '#app',
  created(){
    Vue.prototype.$http = http.bind(this) //把api绑定到全局
    Vue.prototype.$https = https.bind(this) //把api绑定到全局
  },
  mixins: [mixin],
  router,
  store,
  template: '<App/>',
  components: { App }
})
