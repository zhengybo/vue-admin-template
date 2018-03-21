<template lang="html">
  <echart
  :initLoading="true"
  :setting="mix.setting"
  :param="mix.param"></echart>
</template>

<script>
import mix from './../config/mix'
export default {
  name :'mixBar',
  data(){
    return {
      mix : mix()
    }
  }
}
</script>

<style lang="css">
</style>
