// import Test1 from '@/view/main/search'
export default (_import) => ({
  path: '/main/home',
  name: 'home',
  component: _import('main/home'),
  meta : {
    // menu : false
    icon : 'income',
    libRights : true
  }
})
