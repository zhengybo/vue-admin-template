/**
 * 中心路由
 */
/**
 * @param meta
 *  {
 *    menu   : 是否显示在主菜单                               default => true
 *    link   : 是否该路由可以跳转(导航中需要判断)
 *             default => 菜单栏节点是否有子路由 ? false : true
 *             在路由中叶子节点在强制为true,指向redirect
 *    cache  : 是否该路由被缓存
                对于菜单栏         default => true
                对于非菜单栏       default => false
 *    children : 同级路由 但不会显示在menu里面 在导航栏里面显示
 *    libRights : 固有权限 设置为true则不会经过权限判定直接访问 default => false
 *    grider : 是否在导航上显示 default => true
 *    query : 携带上一些标记 default => {}
 *    cacheViews : 该节点对应的缓存信息（包含父节点）
 *    speedTab : 是否显示到快速导航上 需要设置cache 为true 有效
 *                对于cache为true的节点默认会添加到快速导航栏 配置为false则不会
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
      link : true
    }
  }
}
