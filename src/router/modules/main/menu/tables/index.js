import Table from '@/view/main/table'
export default (_import) => ({
  path: '/main/table',
  name: 'tables',
  redirect: '/main/table/default-table',
  component: Table,
  children : [
    {
      path: '/main/table/example-table',
      name: 'exampleTable',
      component: _import('main/table/example'),
      children : [
        {
          path: '/main/table/async-table',
          name: 'asyncTable',
          component: _import('main/table/example/asyncTable'),
          meta : {
            // cacheViews : ['chartsExample','chartMap'],
          }
        },
        {
          path: '/main/table/once-table',
          name: 'onceTable',
          component: _import('main/table/example/onceTable'),
          meta : {
            // cacheViews : ['chartsExample','chartMap'],
          }
        }
      ],
      meta : {
        // cacheViews : ['chartsExample','chartMap'],
      }
    },
    {
      path: '/main/table/default-table',
      name: 'defaultTable',
      component: _import('main/table/defaultTable'),
      meta : {
        // cacheViews : ['chartsExample','chartMap'],
      }
    },
    {
      path: '/main/table/test-table',
      name: 'testTable',
      component: _import('main/table/testTable'),
      meta : {
        // cacheViews : ['chartsExample','chartMap'],
      }
    }
  ],
  meta : {
    icon : 'email'
  }
})
