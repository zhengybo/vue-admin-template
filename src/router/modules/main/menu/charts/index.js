import Charts from '@/view/main/charts'
export default (_import) => ({
  path: '/main/charts',
  name: 'charts',
  redirect: '/main/charts/chartDefault',
  component: Charts,
  children : [
    {
      path: '/main/charts/example',
      name: 'chartsExample',
      component: _import('main/charts/example'),
      // 对于meta下边的路由不会默认缓存,同时对于多级缓存需要配置cacheViews
      children : [
        {
          path: '/main/charts/chart-map',
          name: 'chartMap',
          component: _import('main/charts/example/map'),
          meta : {
            // cacheViews : ['chartsExample','chartMap'],
          }
        },
        {
          path: '/main/charts/chart-line',
          name: 'chartLine',
          component: _import('main/charts/example/line'),
          meta : {
            // cacheViews : ['chartsExample','chartLine'],
          }
        },
        {
          path: '/main/charts/chart-bar',
          name: 'chartBar',
          component: _import('main/charts/example/bar'),
          meta : {
            // cacheViews : ['chartsExample','chartBar'],
          }
        },
        {
          path: '/main/charts/mix-bar',
          name: 'mixBar',
          component: _import('main/charts/example/mix'),
          meta : {
            // cacheViews : ['chartsExample','chartBar'],
          }
        }
      ]
    },
    {
      path: '/main/charts/chart-default',
      name: 'chartDefault',
      component: _import('main/charts/defaultCharts')
    },


  ],
  meta : {
    icon : 'email'
  }
})
