/**
 * 特殊地图统计配置
 */

import { Obj } from '@/js/public/tool'

export default type => options => {
    console.log(options);
  return {
    title: Obj.merge({
        text: '',
        left: 'center',
        textStyle: {
          
        }
    },options.title),
    tooltip: {
        trigger: 'item',
        formatter: '{b} {c}'
    },
    visualMap: Obj.merge({
        seriesIndex: 0,
        min: 0,
        max: options.max || 0,
        left: 'left',
        top: 'bottom',
        inRange: {
            color: ["#5AC8D8","#597FCA","#2552AC"],
            symbol : ['roundRect'],
            symbolSize : [20,10]
        },
        text: ['高','低'],           // 文本，默认为数值文本
        calculable: true
    },options.visualMap),
    grid: {
        height: 200,
        width: 8,
        right: 80,
        bottom: 10
    },
    xAxis: {
        type: 'category',
        data: [],
        splitNumber: 1,
        show: false
    },
    yAxis: {
        position: 'right',
        min: 0,
        max: 20,
        splitNumber: 20,
        inverse: true,
        axisLabel: {
            show: true
        },
        axisLine: {
            show: false
        },
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        data: []
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
        },options.series),
        {
            zlevel: 2,
            name: '地图指示',
            type: 'bar',
            barWidth: 5,
            itemStyle: {
                normal: {
                    color: undefined,
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            data: [20]
        }
      ]
  }
}
