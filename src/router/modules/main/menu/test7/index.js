
export default (_import) => ([
  {
    path: '/main/test7',
    name: 'test7',
    component: _import('main/activeManage'),
    children : [
      {
        path: '/main/test7-1',
        name: 'test7-1',
        redirect: '/main/test7-1-1',
        component: _import('main/search/list'),
        children : [
          {
            path: '/main/test7-1-1',
            name: 'test7-1-1',
            component: _import('main/lib/setting')
          }
        ],
        meta : {
        }
      },
      {
        path: '/main/search23',
        name: 'search23',
        component: _import('main/search/list')
      }
    ],
    meta : {
      icon : 'email'
    }
  },
  {
    path: '/main/test8',
    name: 'test8',
    component: _import('main/activeManage'),
    meta : {
      icon : 'email'
    }
  },
])
