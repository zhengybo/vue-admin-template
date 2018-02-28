/**
 * 所有类型的echart图 特别配置 （根据项目扩展、删减或修改）
 */
const r = p => require('./configs/' + p).default,
      m = r('mapEchart'),        // 地图
      p = r('packEchart'),       // 线图 、柱图
      mc = r('mapChinaEchart');  // 点图、热力图
export default {
  mapEchart  : mc('map'),
  barEchart  : p('bar'),
  lineEchart : p('line'),
  scatterEchart : m('scatter'),
  heatmapEchart : m('heatmap')
}
