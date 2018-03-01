/**
 * 所有类型的echart图 特别配置 （根据项目扩展、删减或修改）
 */
import { mE, pE, mcE } from './configs'
export default {
  mapEchart  : mcE('map'),
  barEchart  : pE('bar'),
  lineEchart : pE('line'),
  scatterEchart : mE('scatter'),
  heatmapEchart : mE('heatmap')
}
