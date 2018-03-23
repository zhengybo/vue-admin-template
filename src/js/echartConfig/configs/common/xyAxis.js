/**
 * 抽离 xAxis yAxis 配置
 */
import { Obj, Arrayed } from '@/js/public/tool'
export default (xAxis,yAxis) => {
  // Arrayed.objToArray(xAxis);
  Array.isArray(xAxis) || (xAxis = [xAxis]);
  Array.isArray(yAxis) || (yAxis = [yAxis])
  xAxis.forEach((item,index) => {
   Obj.merge(item ,Object.assign({
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
  yAxis.forEach((item) => {
   Obj.merge(item ,Object.assign({
     type: 'value'
   },item))
 });
 return { xAxis, yAxis }
}
