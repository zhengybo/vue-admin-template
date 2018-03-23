<template lang="html">
  <echart
  :initLoading="true"
  :setting="line.setting"
  :param="line.param"></echart>
</template>

<script>
import line from './../config/line'
export default {
  name :'chartLine',
  data(){
    return {
      line : line()
    }
  }
}
</script>

<style lang="css">
</style>
