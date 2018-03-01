/**
 * 特殊地图类的配置
 */
import { Obj } from '@/js/public/tool'
const maps = ['scatter','heatmap']; //需要地图的类型
export default type => options => {
  let { title={}, backgroundColor='#404a59', geo={}, series=[] } = options;
  return {
      title: Obj.merge({ // title属性优先级高于baseExConfig中
        textStyle : {
          // fontWeight  : 'normal',
          color : '#fff'
        },
        top : 10
      },title),
      backgroundColor: backgroundColor,
      visualMap: {
          min: 0,
          max: 500,
          splitNumber: 5,
          inRange: {
              color: ['#d94e5d','#eac736','#50a3ba'].reverse()
          },
          textStyle: {
              color: '#fff'
          }
      },
      geo: Obj.merge({
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
      },geo),

      series : series.map(item => Obj.merge({
                name : '',
                type: type,
                coordinateSystem: 'geo',
                data:[],
              },item))
  }
}
