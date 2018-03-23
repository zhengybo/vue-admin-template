/**
 * 地图统计配置
 */

import { Obj } from '@/js/public/tool'

export default type => options => {
  let { title , max , visualMap = {}, series = {} } = options;
  return {
    title: Obj.merge({ // 标题优先级高于baseExConfig中

    },title),
    tooltip: {
        trigger: 'item',
        formatter: '{b} {c}'
    },
    visualMap: Obj.merge({
        seriesIndex: 0,
        min: 0,
        left: 'left',
        top: 'bottom',
        inRange: {
            color: ["#5AC8D8","#597FCA","#2552AC"],
            symbol : ['roundRect'],
            symbolSize : [20,10]
        },
        text: ['高','低'],           // 文本，默认为数值文本
        calculable: true
    },visualMap),
    grid: {
        height: 200,
        width: 8,
        right: 80,
        bottom: 10
    },

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
