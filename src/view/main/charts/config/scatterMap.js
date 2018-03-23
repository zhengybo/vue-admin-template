import apis from '@/js/api'
export default () => {
  return {
    style : {
      height : '500px'
    },
    param : {
      type : 'scatterEchart',
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
      url : apis.geoMapChartExample,
      data : {

      },
      alias : {
        sounce : true
      },
      success : (data,options) => { //options 指代 echart.param.options
        options.series = data
      },
    }
  }

}
