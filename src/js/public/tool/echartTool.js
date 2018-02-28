/**
 * 关于 echart 的 一些 特殊工具 函数
 */
class echartTool {
  static setHeight(echart,options,target){ //设置 柱状图了宽度
    let length = 0;
    if(Array.isArray(options.series)){
      length = (options.series[0].data && options.series[0].data.length || 10);
      length *= options.series.length;
    }else {
      length = (options.series.data && options.series.data.length || 10);
    }
    length = length > 6 ? length : 6;
    echart.style.height = 40 * length + 'px';
    target.resize()
  }
}
export {echartTool}
