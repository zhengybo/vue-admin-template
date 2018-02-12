<template lang="html">
  <div class=" navTools">
    <theme class="r"></theme>
    <span class="blank_block"></span>
    <screenfull class="r"></screenfull>
    <span class="blank_block"></span>
    <reload class="r"></reload>
  </div>
</template>

<script>
import Screenfull from './../screenFull'
import Reload from './../reload'
import Theme from './../theme'
// export {default as Theme} from './theme'
export default {
  name : 'subNavTools',
  components : {
    Screenfull,
    Reload,
    Theme
  }
}
</script>

<style scoped lang="scss">
.navTools{
  // width: 120px;
  height: 100%;
  display: inline-block;
  position: absolute;
  right: 44px;
  top:0;
}

.blank_block{
  float: right;
  width: 5px;
  height: 30px;
}
</style>
