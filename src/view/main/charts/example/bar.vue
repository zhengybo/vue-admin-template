<template lang="html">
  <!-- <echart
  :initLoading="true"
  :setting="bar.setting"
  :param="bar.param"></echart> -->
  <div class="">
    柱图<input type="text" name="" value="xxxxccc">
  </div>
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
