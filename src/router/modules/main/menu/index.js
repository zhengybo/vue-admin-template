/**
 * 菜单项全部路由
 */
import {Arrayed} from '@/js/public/tool'
import order from './order'
export default (_import) => {
  return Arrayed.deconstruction(
    (r => r.keys().map(key => r(key).default(_import)))
    (require.context('./', true, /^\.\/((?!\/)[\s\S])+\/index\.js$/)),
    (arr) => { //可以进行一些操作
      // console.log(arr);
    }
  ).sort((a,b) => order.indexOf(a.name) - order.indexOf(b.name))
}
