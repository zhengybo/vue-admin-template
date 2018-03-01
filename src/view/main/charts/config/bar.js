import apis from '@/js/api'
export default {
  param : {
    type : 'barEchart',
    config : {
      savename : '柱状图趋势'
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
