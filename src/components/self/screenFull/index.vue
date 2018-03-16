<!-- 全屏 -->
<template>
  <div class="screenfullFrame">
    <div @click='click' class="screenfull"></div>
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'screenfull',
  data() {
    return {

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
  // @include transform(scale(1.1),scale(1));
  width: 30px;
  height: 100%;
  position: absolute;
  background: url('/src/assets/images/screenfull.png') no-repeat center center;
  background-size: 20px 20px;
  top: 0;
  left: 0;
  transition: all 0.2s ease;
}

</style>
