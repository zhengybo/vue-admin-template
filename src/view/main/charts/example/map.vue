<template lang="html">
  <echart
  :initLoading="true"
  :styleCSS="map.style"
  :setting="map.setting"
  :param="map.param"></echart>
</template>

<script>
import map from './../config/map'
export default {
  name :'chartMap',
  data(){
    return {
      map : map()
    }
  }
}
</script>

<style lang="css">
</style>
