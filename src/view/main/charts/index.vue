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
    <echart
    :initLoading="true"
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
  name : 'test1',
  data(){
    return {
      bar,
      map,
      line,
      barHor,
      scatterMap
    }
  }
}
</script>

<style lang="css">
</style>
