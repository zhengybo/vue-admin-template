// 所有小工具
export default [
  {
    key : 'setting', icon : 'settings', name : '设置',
    click(){
      console.log('这里可以进行设置事件');
    }
  },
  {
    key : 'home', icon : 'home', name : '主页',
    click(){
      console.log('这里可以进行主页事件');
    }
  },
  {
    key : 'user', icon : 'user', name : '个人中心',
    click(){
      console.log('这里可以进行个人中心事件');
    }
  },
  {
    key : 'chart', icon : 'chart', name : '图标',
    click(){
      console.log('这里可以进行图标事件');
    }
  },
  {
    key : 'email', icon : 'email', name : '邮件',
    click(){
      console.log('这里可以进行邮件事件');
    }
  },
  {
    key : 'exit', icon : 'exit', name : '退出',
    click(){
      console.log('这里可以进行退出事件');
    }
  }
  // {icon : 'setting',name : '64',key : 'setting',status : false},
  // {icon : 'setting',name : '89',key : 'setting',status : false}
].map(item => Object.assign(item,{status : false,disabled : false}))
