<template lang="html">
  <div class="">
    <div class="chart-container">
      <lazy-component >
        <echart
        :initLoading="true"
        :setting="line.setting"
        :param="line.param"></echart>
      </lazy-component>
    </div>
    <div class="chart-container">
      <lazy-component >
        <echart
        :initLoading="true"
        :setting="bar.setting"
        :param="bar.param"></echart>
      </lazy-component>
    </div>
    <div class="chart-container">
      <div class="async-search pd-l-20">
        <form-list
        :fromAttrs="barHor.attrs"
        :fields="barHor.fields"
        :optionAttrs="barHor.optionAttrs"
        :defaultValue="barHor.setting.data"
        @success="success"
        ></form-list>
      </div>
      <lazy-component @show="BarHorShow" >
        <echart
        :reload="reloadBarHorFlag"
        :setting="barHor.setting"
        :param="barHor.param"></echart>
      </lazy-component>
    </div>
    <div class="chart-container">
      <lazy-component >
        <echart
        :initLoading="true"
        :styleCSS="map.style"
        :setting="map.setting"
        :param="map.param"></echart>
      </lazy-component>
    </div>
    <div class="chart-container">
      <lazy-component >
        <echart
        :initLoading="true"
        :styleCSS="scatterMap.style"
        :setting="scatterMap.setting"
        :param="scatterMap.param"></echart>
      </lazy-component>
    </div>
  </div>
</template>

<script>
import bar from './config/bar'
import map from './config/map'
import line from './config/line'
import barHor from './config/bar-hor'
import scatterMap from './config/scatterMap'
export default {
  name : 'chartDefault',
  data(){
    return {
      bar : bar(),
      map : map(),
      line : line(),
      barHor : barHor(),
      scatterMap : scatterMap(),
      reloadBarHorFlag : false,
    }
  },
  mounted (){
    // this.reloadBarHor();
  },
  methods : {
    BarHorShow(){
      this.$nextTick(() => this.reloadBarHor());
    },
    reloadBarHor (){
      this.reloadBarHorFlag = !this.reloadBarHorFlag;
    },
    success(obj){
      console.log(obj);
      this.reloadBarHor();
    }
  }
}
</script>

<style lang="scss">
.chart-container{
  min-height: 300px;
}
.async-search{
  .form-item{
    min-width: 300px!important;
  }
}
</style>
