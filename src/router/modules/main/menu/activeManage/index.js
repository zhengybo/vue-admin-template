// import ActiveManage from '@/view/main/activeManage'
export default (_import) => ({
  path: '/main/active-manage',
  name: 'activeManage',
  component: _import('main/activeManage'),
  meta : {
    // menu :  false
    icon : 'data-manage'
  }
})
