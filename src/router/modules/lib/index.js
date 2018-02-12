/**
 * 固定的路由 一开始 就被打包
 */
import Err403 from '@/view/lib/403'
import Err404 from '@/view/lib/404'
import Login  from '@/view/lib/login'
import Show   from '@/view/lib/show'
export default [
  {path: '/',redirect: '/main',hidden: true},
  {
    path: '/403',
    name : 'Error403',
    component: Err403,
    hidden: true
  },
  {
    path: '/404',
    name : 'Error404',
    component: Err404,
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    hidden: true
  },
  {
    path: '/show',
    name: 'show',
    component: Show,
    hidden: true
  }
]
