import apis from '@/js/api'
let once = false;
export default {
  param : {
    type : 'barEchart',
    config : {
      horizonta : true,
      savename : '异步横向柱图趋势',
    },
    options : {
      xAxis : {
        data: []
      },
      series : [],
      legend : {
        selected : {
          // '吃类' : true,
          // '玩类' : true,
          // '喝类' : false,
          // '耍类' : false
         }
      }
    }
  },
  setting : {
    url : apis.lineChartExample,
    async : {
      default : [],
      request : { // 用来请求 初始化 数据相关信息
        url : apis.asyncNameExample,
        data : {

        },
        success : (data,async,options) => {
          if(!once){
            async.default = data.default;
            once = !once;
          }
          let series = [],
              selected = {};
          data.list.forEach(item => {
            series[series.length] = {
              name : item.title,
              data : []
            }
            // console.log(item.title,async.default);
            selected[item.title] = !!~async.default.indexOf(item.title);
            // async[item.title] = item.data;
            async.query[item.title] = item.data;
          });
          // options.series = series
          Object.assign(options,{
            legend : {
              selected
            },
            series
          })
          // console.log(options,async);
        }
      },
      // compass : { //是否请求完成
      //
      // },
      query : { //请求 类别的 参数
        // '吃类' : { id : 1 },
        // '玩类' : { id : 2 },
        // '喝类' : { id : 3 },
        // '耍类' : { id : 4 }
      }
    },
    data : { //请求

    },
    alias : {
    },
    success : (data,options) => { //options 指代 echart.param.options
      // console.log('----');
      options.xAxis = data.xAxis;
      options.series = data.series;
    },
  }
}
