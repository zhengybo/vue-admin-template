/**
 * 注册全局组件
 */
export default vue => {
  require('@/components').default(vue) //注册项目组件
  require('./element').default(vue) //注册element组件
};
