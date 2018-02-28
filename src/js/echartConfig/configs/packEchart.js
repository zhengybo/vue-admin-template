/**
 * 普通折线柱状图通用配置
 */

/**
 * config {
  yx : true
}
 */
/** options传入参数说明
 * options -> {
    title : {},

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
const types =['line','bar'];  //注册项目持有图类型
import { Obj } from '@/js/public/tool'
const _legend = (arr = []) => {
  let result = {}
  arr.map(item => item.name).forEach((key,index) => result[key] = !index);
  return result;
}
export default type => (options, config = {}) => {
  let { xAxis = [], title = {}, legend = {}, series = [], savename } = options;
   Array.isArray(xAxis) || (xAxis = [xAxis])
   xAxis.forEach((item,index) => {
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
  // let percent = Array.isArray(xAxis) && xAxis.length>1
  let [x,y] = [
    xAxis,
    {
      type: 'value',
      // max:percent ?  (value) => (value.max + value.max/10) : null
    }
  ]

  // if(yx === void 0 && type == 'bar'){yx = true;}
  if(config.yx)[x,y] = [y,x];
  return {//新增统计
    title : Object.assign({
                show : false,
                text: '',
                left  : 'center',
                textStyle : {
                  fontWeight  : 'normal'
                }
              },title),
    // toolbox: {//工具栏
    //   feature: {
    //       saveAsImage: {
    //         name :  'xxxx'
    //       }
    //   },
    // },
    xAxis : x,
    yAxis : y,
    series : series.map(item => Obj.merge({
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
                      position: config.yx === false ? 'top' : 'right',
                      color : '#000'
                    }
                  },
                  barWidth  : 20,
                  smooth : true
                },item)),
    legend : series.length >1 ?   {
      top :'10',
      data : series.map(item => item.name),
      selected : legend.selected || _legend(series) ||  null
    } : {}
  }
}
