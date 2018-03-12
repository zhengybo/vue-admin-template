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
      redirect : '/main/home/detail/default',
      component: _import('main/home/detail'),

      children : [
        {
          path: '/main/home/detail/chart1',
          name: 'detailChart1',
          component: _import('main/home/charts/chart1')
        },
        {
          path: '/main/home/detail/chart2',
          name: 'detailChart2',
          component: _import('main/home/charts/chart2')
        },
        {
          path: '/main/home/detail/chart3',
          name: 'detailChart3',
          component: _import('main/home/charts/chart3')
        },
        {
          path: '/main/home/detail/default',
          name: 'detaiDefault',
          component: _import('main/home/detaiDefault'),
          meta : {
            // cache :true,
            grider : false
          }
        }
      ],

      meta : {

        children : [{
          path: '/main/home/detail/list',
          name: 'detailList',
          component: _import('main/home/list'),
          meta : {
            cache : true,

            query : {
              id : 1
            },

          },

        }]
      }

    }]
  }
})
