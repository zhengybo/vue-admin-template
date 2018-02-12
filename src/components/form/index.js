
/**
 * 表单组件(公用) 需要进一步封装
 */
export default vue => {
  require('./forms').default(vue);
  vue.component('formList',require('./feilds').default)
}
