/**
 * 基础虚拟图映射组件基本初始配置
 */
import { Obj } from '@/js/public/tool'
export default (visualMap) => {
  return  Obj.merge({
      inRange: {
          color: [ '#50a3ba', '#eac736', '#d94e5d' ]
      }
  },visualMap)
}
