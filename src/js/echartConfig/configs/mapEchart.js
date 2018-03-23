/**
 * 特殊地图类的配置
 */
import { Obj } from '@/js/public/tool'
const maps = ['scatter','heatmap']; //需要地图的类型
import { ETvisualMap, ETxyAxis, ETgeo, ETtitle } from './common'
export default type => options => {
  let {
    title = {},
    xAxis : _xAxis = [{}],
    yAxis : _yAxis = [{}],
    backgroundColor = '#404a59',
    visualMap = {},
    geo = {},
    series = [] } = options;
  Array.isArray(series) || (series = [series]);
  let attrs = {};
  if(type == 'scatter'){
    attrs = {
      visualMap : Obj.merge(ETvisualMap({
        // 私有visualMap
        min: 0,
        max: 500,
        splitNumber: 5,
        textStyle: {
            color: '#fff'
        }
      }), visualMap),
      geo : Obj.merge({
        // 私有geo

      }, ETgeo(geo))
    }
  }
  if(type == 'heatmap'){
    attrs = ETxyAxis(_xAxis,_yAxis);
  }
  return {
      title: Obj.merge(ETtitle({ // title属性优先级高于baseExConfig中
        textStyle : {
          // fontWeight  : 'normal',
          color : '#fff'
        },
        top : 10
      }),title),
      ...attrs,
      backgroundColor: backgroundColor,
      series : series.map(item => Obj.merge({
                name : '',
                type: type,
                coordinateSystem: 'geo',
                data:[],
              },item))
  }
}
