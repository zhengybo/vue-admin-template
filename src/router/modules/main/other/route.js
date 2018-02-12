/**
 * 路由项
 */
export default (_import) => {
  return [
    { /* 设置 */
      path: '/main/setting',
      name: 'setting',
      component: _import('main/lib/setting')
    },
    { /* 个人中心 */
      path: '/main/user',
      name: 'user',
      component: _import('main/lib/user')
    }
  ]
}
