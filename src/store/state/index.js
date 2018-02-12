/**
 * 菜单检测只会查询children   subchild  表示该菜单功能下的 细节路由 (详情，编辑等)
 */
export default {
  menu : [ //主菜单
    {
      icon: true,
      name : '激活管理',
      className : 'activeManage',
      key : 'activeManage',
      link : '/main/ActiveManage',
      linkName : 'activeManage',
      // children : []
    },
    {
      icon: true,
      name : '费用管理',
      className : 'costSearch',
      key : 'costSearch',
      link : '/main/costSearch',
      linkName : 'costSearch',
      // children : []
    },
    {
      name : '活动管理',
      key : 'test1',
      link : '/main/test1',
      linkName : 'test1',
      children : [
        {
          name : '管理上',
          key : 'test2',
          link : '/main/test3',
          linkName : 'test2',
          children : [
            {
              name : '测试',
              key : 'search',
              link : '/main/search',
              linkName : 'search',
              subChild : [
                {
                  name : '详情',
                  key : 'manage4',
                  link : '/main/test5',
                  linkName : 'activeManage',
                },
                {
                  name : '列表',
                  key : 'manage5',
                  link : '/main/test6',
                  linkName : 'activeManage',
                }
              ]
            },
            {
              name : '管理4',
              key : 'manage7',
              link : '/main/test7',
              linkName : 'activeManage',
            }
          ],
          // subChild : [
          //   {
          //     name : '详情',
          //     key : 'manage2',
          //     link : '/main/activeManage4',
          //     linkName : 'activeManage',
          //   },
          //   {
          //     name : '列表',
          //     key : 'manage2',
          //     link : '/main/activeManage5',
          //     linkName : 'activeManage',
          //   }
          // ]
        },
        {
          name : '管理下',
          key : 'test2',
          link : '/main/test2',
          linkName : 'activeManage',
        }
      ]
    }
  ]
}
