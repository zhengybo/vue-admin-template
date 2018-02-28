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
  /* 数据转化 根据项目,具体修改 */
  // 项目应该有一个统一的数据格式返回,这里统一处理请求的数据的格式转化。
  static changeData(data,alias){
    /**
     * 默认data 格式为
     * [{
       name : 'xxxx',
       data : [{name : 'xxx',value : 'xxx'}]},
       {..},{...},...]
     */
    alias = Object.assign({
      xAxis : 'name',  //横坐标
      // data : 'data', //数据别名.
      value : 'value' //series 值
      // percent : undefined //series 第二个值
    },alias)
    let xAxis = {data : []},
        series = [];
    data.forEach((item, index) => {
      let _series = {data : []};
      _series.name = item.name;
      item.data.forEach(list => {
        !index && xAxis.data.push(list[alias.xAxis]);
        _series.data.push(list[alias.value]);
      });
      series.push(_series);
    })
    return  {
      xAxis : [xAxis] ,
      series : series
    };
  }
}
export {echartTool}
