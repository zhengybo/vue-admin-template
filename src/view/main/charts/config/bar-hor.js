import apis from '@/js/api'
export default () => {
  let once = false;
  return {
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
          }
        },
        // compass : { //是否请求完成
        //
        // },
        query : { //请求 类别的 参数
        }
      },
      data : { //请求
        s1 : '我是初始的s1',
        s2 : '',
        s3 : '',
      },
      alias : {
      },
      success : (data,options) => { //options 指代 echart.param.options
        // console.log('----');
        options.xAxis = data.xAxis;
        options.series = data.series;
      },
    },
    //----查询条件------
    attrs : {
      labelWidth : '60px',
      inline : true
    },
    optionAttrs : {
      submitMessage : {
        name : '查询'
      }
    },
    fields : [
      {
        key : 's1',
        type : 'input',
        label : '我是S1',
        desc : '我在这里s1',

      },
      // {},
      {
        key : 's2',
        type : 'select',
        label : '我是S2',
        desc : '请选择s2',
        options : [{
            value: 'op1',
            label: '黄金糕'
          }, {
            value: 'op2',
            label: '双皮奶1'
          },
          {
            value: 'op3',
            label: '双皮奶2'
          }]
      },
      {
        key : 's3',
        type : 'select',
        label : '我是S3',
        desc : '请选择s3',
        options : [{
            value: 'op1',
            label: '黄金糕'
          }, {
            value: 'op2',
            label: '双皮奶1'
          },
          {
            value: 'op3',
            label: '双皮奶2'
          }]
      }
    ]
  }
}
