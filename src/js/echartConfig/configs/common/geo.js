/**
 * 地图坐标组件基础配置
 */
import { Obj } from '@/js/public/tool'
export default () => {
  return {
      map: 'china',
      label: {
          emphasis: {
              show: false
          }
      },
      roam: true,
      itemStyle: {
          normal: {
              areaColor: '#323c48',
              borderColor: '#111'
          },
          emphasis: {
              areaColor: '#2a333d'
          }
      }
  }
}
