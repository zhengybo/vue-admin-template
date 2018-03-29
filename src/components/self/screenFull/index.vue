<!-- 全屏 -->
<template>
  <div class="screenfullFrame">
    <div
    :style="{
      'backgroundImage': `url('${bg}')` }"
       @click='click' class="screenfull"></div>
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'screenfull',
  data(){
    return {
      bg : require('@/assets/images/screenfull.png')
    }
  },
  methods: {
    click() {
      if (!screenfull.enabled) {
      }
      screenfull.toggle()
    }
  }
}
</script>

<style lang="scss" scoped>

.screenfullFrame{
  cursor: pointer;
  position: relative;
  width: 30px;
  height: 100%;
}

.screenfull{
  @include transform(scale(1.1),scale(1));
  width: 30px;
  height: 100%;
  position: absolute;
  background-repeat: no-repeat;
  background-position: center center;
  // background: url('/src/assets/images/screenfull.png') no-repeat center center;
  background-size: 20px 20px;
  top: 0;
  left: 0;
  transition: all 0.2s ease;
}

</style>
