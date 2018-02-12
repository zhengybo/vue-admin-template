/**
 * 一些非菜单项关联路由
 * 该默认权限 libRights 为true 不用经过权限判定
 */
import { Obj } from '@/js/public/tool'
import route from './route'
export default (_import) => {
  return route(_import).map(item => {
    Obj.cover(item.meta || (item.meta = {}) , {
      menu : false,
      cache : false,
      libRights : true
    })
    return item;
  })
}
