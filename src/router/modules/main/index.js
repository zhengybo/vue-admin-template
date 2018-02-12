/**
 * 中心路由
 */
/**
 * @param meta
 *  {
 *    menu   : 是否显示在主菜单                          default => true
 *    link   : 是否该路由可以跳转(导航中需要判断)
 *             default => 在路由中且有子节点 ? false : true
 *             在路由中叶子节点在强制为true,指向redirect
 *    cache  : 是否该路由被缓存                          default => true
 *    children : 同级路由 但不会显示在menu里面 在导航栏里面显示
 *    libRights : 固有权限 设置为true则不会经过权限判定直接访问 default => false
 *  }
 *
 */

import menu from './menu' //主菜单
import other from './other' //零散项
export default (_import) => {
  return {
    path: '/main',
    name: 'main',
    component: _import('main'),
    redirect: '/main/home',
    children : [
      ...menu(_import),
      ...other(_import)
    ],
    meta : {
      // menu :
      link : true
    }
  }
}
