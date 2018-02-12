// Created by zhengyibo in 2017-11-20
/**
 * 自定义组件 (不具有强的功能性)
 * 使用CustromLoading 类似组件调用
 */
import {Str} from '@/js/public/tool'
export default vue => {
  const compoents = (r => r.keys().map(key => ({
    key :'Custrom' + Str.titleCase(key.split('/')[1]),
    value : r(key).default
  })))(require.context('./', true, /^\.\/((?!\/)[\s\S])+\/index\.vue$/))
  compoents.forEach(item => vue.component(item.key,item.value))
};
