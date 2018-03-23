// 配置公用配置项
import { Obj } from '@/js/public/tool'
export default (config) => {
  let { savename = void 0 } = config;
  return {
    toolbox: { //工具栏
      feature: {
          saveAsImage: {
            name : savename
          }
      }
    }
  }
}
