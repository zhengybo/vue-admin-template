
/**
 * 地图统计配置
 */

import { Obj } from '@/js/public/tool'
import { ETvisualMap, ETtitle } from './common'
export default type => options => {
  let {
    title = {} ,
    visualMap : _visualMap = {},
    series = {} } = options;
  return {
    title: Obj.merge(ETtitle({ // 标题优先级高于baseExConfig中

    }),title),
    visualMap: Obj.merge({
        seriesIndex: 0,
        min: 0,
        left: 'left',
        top: 'bottom',
        inRange: {
            symbolSize : [20,10]
        },
        text: ['高','低'],           // 文本，默认为数值文本
        // calculable: true
    },ETvisualMap(_visualMap)),
    series: [
        Obj.merge({
            zlevel: 0.5,
            name: '中国',
            type: 'map',
            mapType: 'china',
            selectedMode : 'multiple',
            roam: true,
            zoom : 0.6,
            left: 0,
            right: '15%',
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            data:[]
        },series)
      ]
  }
}
