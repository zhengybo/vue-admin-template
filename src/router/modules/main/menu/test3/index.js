
export default (_import) => ({
  path: '/main/search',
  name: 'search',
  redirect: '/main/search2',
  component: _import('main/search'),
  meta : {
    link : true,
    icon : 'email'
  },
  children : [
    {
      path: '/main/search1',
      name: 'search1',
      // redirect: '/main/search1-1',
      component: _import('main/search/list'),
      children : [
        {
          path: '/main/search1-1',
          name: 'search1-1',
          component: _import('main/lib/setting')
        }
      ],
      meta : {
        children : [
          {
            path: '/main/search2/detail',
            name: 'search2-detail',
            component: _import('main/search/detail'),
            meta : {

            }
          }
        ]
      }
    },
    {
      path: '/main/search2',
      name: 'search2',
      component: _import('main/search/list'),
      meta : {
        // cacheViews : ['search2','search']
      }
    },
    // {
    //   path: '/main/search2',
    //   name: 'search2',
    //   component: _import('main/search/list'),
    //   meta : {
    //
    //   }
    // },
    // {
    //   path: '/main/search2/detail',
    //   name: 'search2-detail',
    //   component: _import('main/search/detail'),
    //   meta : {
    //     menu : false,
    //     parent : 0 ,
    //     node : 1,
    //     cache : false
    //   }
    // },
    // {
    //   path: '/main/search2/detail1',
    //   name: 'search2-detail1',
    //   component: _import('main/search/detail'),
    //   meta : {
    //     menu : false,
    //     parent : 1,
    //     node : 2
    //   }
    // }
  ]
})
