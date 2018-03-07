// import Test1 from '@/view/main/search'
export default (_import) => ({
  path: '/main/home',
  name: 'home',
  component: _import('main/home'),
  meta : {
    // menu : false
    icon : 'income',
    grider : false,
    libRights : true,
    children : [{

      path: '/main/home/detail',
      name: 'homeDetail',
      component: _import('main/home/detail'),
      children : [{
        path: '/main/home/detail1',
        name: 'homeDetail1',
        component: _import('main/home/detail'),
      }],

      meta : {
        children : [{
          path: '/main/home/detail/1',
          name: 'homeDetail-1',
          component: _import('main/home/detail'),
        }]
      }

    }]
  }
})
