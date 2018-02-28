/**
 * 普通折线柱状图通用配置
 */

/** options传入参数说明
 * options -> {
    title : {},
    yx : true,
    xAxis : [], //require
    series : [  //require
      {
        data : [...],
        name : 'xxx',
        ...
      }
      ...
    ],
    legend :[] //require
   }
 */
import { Obj } from '@/js/public/tool'
const types =['line','bar'];  //注册项目持有图类型
const legend = (arr = []) => {
  let result = {}
  arr.map(item => item.name).forEach((key,index) => result[key] = !index);
  return result;
}
export default type => options => {
   Array.isArray(options.xAxis) || (options.xAxis = [options.xAxis])
   options.xAxis.forEach((item,index) => {

    Object.assign(item ,Object.assign({
      type: 'category',
      boundaryGap: true,
      data: [],
      axisTick: {
          alignWithLabel: true
      },
      axisLabel : index ? {
        color : '#e85158'
      } : {}
    },item))
   })
  //  Object.assign(options.xAxis,{
  //    alignWithLabel : {}
  //  })
  let percent = Array.isArray(options.xAxis) && options.xAxis.length>1
  let [x,y] = [
    options.xAxis,
    {
      type: 'value',
      max:percent ?  (value) => (value.max + value.max/10) : null
    }
  ]

  if(options.yx === void 0 && type == 'bar'){options.yx = true;}
  if(options.yx)[x,y] = [y,x];
  // let length =  Array.isArray(options.series) ? options.series.length : 1;
  return {//新增统计
    'title' : Object.assign({
                show : false,
                text: '',
                left  : 'center',
                textStyle : {
                  fontWeight  : 'normal'
                }
              },options.title),
    toolbox: {//工具栏
      feature: {
          saveAsImage: {
            name :  options.savename || undefined
          }
      },
    },
    'xAxis' : x,
    yAxis : y,
    'series' : options.series.map(item => Obj.merge({
                  type : ~types.indexOf(type) ? type : 'line',
                  //stack: '总量',
                  data : [],
                  areaStyle : {
                    normal : {
                      opacity :'0.3'
                    }
                  },
                  label: {
                    normal: {
                      show: type == 'bar',
                      position: options.yx === false ? 'top' : 'right',
                      color : '#000'
                    }
                  },
                  barWidth  : 20,
                  smooth : true
                },item)),
    'legend' : options.series.length >1 ?   {
      top :'10',
      data : options.series.map(item => item.name),
      selected : (options.legend  ||  {}).selected || legend(options.series) ||  null
    } : {}
  }
}
