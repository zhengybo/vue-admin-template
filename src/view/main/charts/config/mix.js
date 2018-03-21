import apis from '@/js/api'
export default () => {
  return {
    param : {
      type : 'barEchart',
      config : {
        savename : '柱状图趋势'
      },
      options : {
        xAxis : {
          data: []
        },
        series : [],
        legend : {
          selected : {
            "吃类" : true,
            "喝类" : true,
            "玩类" : false,
            "耍类" : false
          }
        }
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
        data.series[1].type = 'line';
        data.series[3].type = 'line';
        options.series = data.series;
      },
    }
  }

}
