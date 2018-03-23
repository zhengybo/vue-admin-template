import apis from '@/js/api'
export default () => {
  return {
    param : {
      type : 'lineEchart',
      config : {
        savename : '线图趋势'
      },
      options : {
        xAxis : {
          data: []
        },
        series : []
      }
    },
    setting : {
      url : apis.lineChartExample,
      data : {

      },
      alias : {
      },
      success : (data,options) => { //options 指代 echart.param.options
        options.xAxis = data.xAxis;
        options.series = data.series
      },
    }
  }

}
