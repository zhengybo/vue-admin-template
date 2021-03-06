/**
 * 普通折线柱状图通用配置
 */

/**
 * config {
  horizonta : true,
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
import { ETxyAxis, ETtitle } from './common'
const _legend = (arr = []) => {
  let result = {}
  arr.map(item => item.name).forEach((key,index) => result[key] = !index);
  return result;
}
export default type => (options, config = {}) => {
  let {
    xAxis : _xAxis  = [{}],
    yAxis : _yAxis  = [{}],
    title = {},
    legend = {},
    series = [],
    savename } = options,
    { xAxis, yAxis } = ETxyAxis(_xAxis,_yAxis);

  if(config.horizonta) [xAxis,yAxis] = [yAxis,xAxis];

  return {//新增统计
    title : Obj.merge(ETtitle({ // 标题优先级高于baseExConfig中

    }),title),
    xAxis,
    yAxis,
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
                      position: config.horizonta ? 'right' : 'top',
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
