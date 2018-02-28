<template lang="html">
  <div class="">
    <echart
    :initLoading="true"
    :setting="setting"
    :param="param"></echart>
  </div>
</template>

<script>
import apis from '@/js/api'
export default {
  data(){
    return {
      param : {
        type : 'lineEchart',
        config : {
          // yx : true,
          savename : '扫描趋势'
        },
        options : {
          // yx : false,
          xAxis : {
            data: []
          },
          series : [
            {
              type : 'bar'
            }
          ]
        }
      },
      setting : {
        url : apis.lineChartExample,
        data : {

        },
        alias : {
          // mul : false, //多条数据?
          // xAxis : 'dates',  //横坐标
          // data : 'data', //数据别名
          // value : 'count', //series 值

        },
        success : (data,options) => { //options 指代 echart.param.options
          options.xAxis = data.xAxis;
          options.series = data.series
        },
      }
    }
  }
}
</script>

<style lang="css">
</style>
