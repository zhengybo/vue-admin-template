<template lang="html">
  <div class="">
    <echart
    :initLoading="true"
    :setting="line.setting"
    :param="line.param"></echart>
    <echart
    :initLoading="true"
    :setting="bar.setting"
    :param="bar.param"></echart>
    <div class="async-search pd-l-20">
      <form-list
      :fromAttrs="barHor.attrs"
      :fields="barHor.fields"
      :optionAttrs="barHor.optionAttrs"
      :defaultValue="barHor.setting.data"
      @success="success"
      ></form-list>
    </div>
    <echart
    :reload="reloadBarHorFlag"
    :setting="barHor.setting"
    :param="barHor.param"></echart>
    <echart
    :initLoading="true"
    :styleCSS="map.style"
    :setting="map.setting"
    :param="map.param"></echart>
    <echart
    :initLoading="true"
    :styleCSS="scatterMap.style"
    :setting="scatterMap.setting"
    :param="scatterMap.param"></echart>
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
    this.reloadBarHor();
  },
  methods : {
    reloadBarHor (){
      this.reloadBarHorFlag = !this.reloadBarHorFlag;
    },
    success(obj){
      this.reloadBarHor();
    }
  }
}
</script>

<style lang="scss">
.async-search{
  .form-item{
    min-width: 300px!important;
  }
}
</style>
