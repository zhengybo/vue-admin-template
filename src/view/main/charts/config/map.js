import apis from '@/js/api'
export default {
  style : {
    height : '500px'
  },
  param : {
    type : 'mapEchart',
    config : {
      savename : '点图',
    },
    options : {
      title : {
        show : true,
        text : '点图',
        subtextStyle : {
          fontSize : 16
        }
      },
      series : []
    }
  },
  setting : {
    url : apis.mapChartExample,
    data : {

    },
    alias : {
      sounce : true
    },
    success : (data,options) => { //options 指代 echart.param.options
      options.series = data[0]
    },
  }
}
