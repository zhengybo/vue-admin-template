/**
 * 第三方组件
 */
import VueLazyload  from 'vue-lazyload';
export default (vue) => {
  vue.use(VueLazyload,{lazyComponent: true});
}
