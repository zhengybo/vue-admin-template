/**
 * 所有类型的echart图 特别配置
 */
const r = p => require('./configs/' + p).default;
const p = r('packEchart'); //线图 、柱图
const m = r('mapEchart');  //点图、热力图
const mc = r('mapChinaEchart');  //点图、热力图
export default {
  lineEchart : p('line'),
  barEchart  : p('bar'),
  mapEchart  : mc('map'),
  scatterEchart : m('scatter'),
  heatmapEchart : m('heatmap')
}
