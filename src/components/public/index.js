/**
 * 公用组件 (具有强的功能性)
 * 使用TablePagination 类似组件调用
 */
import {Str} from '@/js/public/tool'

export default vue => {
  require('./test/index.js').default(vue)
  const compoents = (r => r.keys().map(key => ({
    key : Str.titleCase(key.split('/')[1]),
    value : r(key).default
  })))(require.context('./', true, /^\.\/((?!\/)[\s\S])+\/index\.vue$/))
  compoents.forEach(item => vue.component(item.key,item.value))
};
