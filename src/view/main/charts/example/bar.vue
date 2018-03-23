<template lang="html">
  <echart
  :initLoading="true"
  :setting="bar.setting"
  :param="bar.param"></echart>
</template>

<script>
import bar from './../config/bar'
export default {
  name :'chartBar',
  data(){
    return {
      bar : bar()
    }
  }
}
</script>

<style lang="css">
</style>
